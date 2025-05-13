import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import { ReminderRepository } from '@/repositories/ReminderRepository';
import { useTranslation } from 'react-i18next';
import { useDb } from './DbContext';

const weekdayMap: Record<string, number> = {
    Sun: 1, Mon: 2, Tue: 3, Wed: 4, Thu: 5, Fri: 6, Sat: 7,
};

type NotificationsContextType = {
    isSynchronized: boolean;
    syncNotifications: () => Promise<void>;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { t } = useTranslation();
    const { dbReady } = useDb();
    const [isSynchronized, setIsSynchronized] = useState(false);

    const syncNotifications = useCallback(async () => {
        setIsSynchronized(false);

        try {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                console.warn('Push notifications permission not granted.');
                return;
            }

            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowBanner: true,
                    shouldPlaySound: true,
                    shouldSetBadge: true,
                    shouldShowList: false,
                }),
            });

            await Notifications.cancelAllScheduledNotificationsAsync();

            const repo = new ReminderRepository();
            const reminders = await repo.getAllActive();
            if (!reminders || reminders.length === 0) {
                setIsSynchronized(true);
                return;
            }

            const now = new Date();
            let scheduledCount = 0;

            outerLoop: for (const rem of reminders) {
                if (!rem.medication) continue;

                const startDate = rem.startDate ? new Date(rem.startDate) : null;
                const endDate = rem.endDate ? new Date(rem.endDate) : null;
                const withinRange = (!startDate || now >= startDate) && (!endDate || now <= endDate);
                if (!withinRange) continue;

                const timesList = rem.times.split(',').map(t => t.trim());
                const daysList = rem.days.split(',').map(d => d.trim());

                const body: string = t('reminder.message', {
                    name: rem.medication.name,
                    dosage: rem.medication.dosage,
                    doses: `${rem.doseShouldBeTaken} ${t('reminder.dose', { count: rem.doseShouldBeTaken })}`,
                });

                for (const timeStr of timesList) {
                    const [hourStr, minuteStr] = timeStr.split(':');
                    const hour = Number(hourStr);
                    const minute = Number(minuteStr);
                    if (isNaN(hour) || isNaN(minute)) continue;

                    for (const dayAbbrev of daysList) {
                        const weekday = weekdayMap[dayAbbrev];
                        if (!weekday) continue;

                        await Notifications.scheduleNotificationAsync({
                            content: { body },
                            trigger: {
                                type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
                                weekday,
                                hour,
                                minute
                            },
                        });

                        scheduledCount++;
                        if (scheduledCount >= 64) {
                            console.warn('Reached notification limit (64)');
                            break outerLoop;
                        }
                    }
                }

            }

            setIsSynchronized(true);
        } catch (err) {
            console.error('Failed to sync notifications:', err);
            setIsSynchronized(false);
        }
    }, [t]);

    useEffect(() => {
        if (dbReady) {
            syncNotifications();
        }
    }, [dbReady, syncNotifications]);

    return (
        <NotificationsContext.Provider value={{ isSynchronized, syncNotifications }}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = (): NotificationsContextType => {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationsProvider');
    }
    return context;
};
