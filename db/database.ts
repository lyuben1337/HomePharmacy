import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Asset } from 'expo-asset';

let database: SQLiteDatabase | null = null;

const SCHEMA_DEST = FileSystem.documentDirectory + 'schema.sql';
const SEED_DEST = FileSystem.documentDirectory + 'seed.sql';

import schemaAsset from '@/db/schema.sql';
import seedAsset from '@/db/seed.sql';

export const initDatabase = async (): Promise<SQLiteDatabase> => {
  if (database) return database;

  database = await openDatabaseAsync('meds.db');

  await AsyncStorage.clear();
  const alreadyInitialized = await AsyncStorage.getItem("db_initialized");

  if (!alreadyInitialized) {
    const schema = Asset.fromModule(schemaAsset);
    const seed = Asset.fromModule(seedAsset);

    await schema.downloadAsync();
    await seed.downloadAsync();

    await FileSystem.copyAsync({ from: schema.localUri!, to: SCHEMA_DEST });
    await FileSystem.copyAsync({ from: seed.localUri!, to: SEED_DEST });

    const schemaSQL = await FileSystem.readAsStringAsync(SCHEMA_DEST);
    await database.execAsync(schemaSQL);

    const seedSQL = await FileSystem.readAsStringAsync(SEED_DEST);
    await database.execAsync(seedSQL);

    await AsyncStorage.setItem("db_initialized", "true");
  }

  return database;
};

export const db = (): SQLiteDatabase => {
  if (!database) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return database;
};
