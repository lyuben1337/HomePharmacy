-- Sample medications
INSERT INTO medication (name, dosage, image_uri, recipe_uri, notes)
VALUES 
  ('Парацетамол', '500мг', NULL, NULL, 'Жаропонижающее'),
  ('Амоксициллин', '250мг', NULL, NULL, 'Антибиотик');

-- Medication units
INSERT INTO medication_unit (medication_id, expiration_date, dose_count, notes)
VALUES 
  (1, '2025-12-31', 20, 'Блистер 1'),
  (1, '2026-06-30', 30, 'Блистер 2'),
  (2, '2025-10-15', 15, NULL);

-- Reminders
INSERT INTO reminder (medication_id, times, days, dose_should_be_taken, start_date, end_date, notes, is_active)
VALUES 
  (1, '08:00,20:00', 'Mon,Wed,Fri', 1, '2025-05-01', '2025-06-01', 'После еды', 0),
  (2, '09:00', 'Tue,Thu', 2, '2025-05-01', NULL, 'Перед завтраком', 1),
  (2, '11:00,15:04,21:00', 'Mon,Tue,Fri', 2, '2025-05-01', NULL, 'Перед завтраком', 1),
  (2, '12:00', 'Sun', 2, '2025-05-01', NULL, 'Перед завтраком', 0);

