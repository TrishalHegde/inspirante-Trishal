CREATE DATABASE IF NOT EXISTS event_portal;
USE event_portal;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role ENUM('admin','student') NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    event_date DATE NOT NULL,
    venue VARCHAR(200) NOT NULL,
    max_capacity INT NOT NULL,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    event_id INT,
    registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_registration (student_id, event_id),
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Seed Admin
INSERT INTO users (username, password, full_name, role) VALUES 
('admin', 'inspirante2026', 'Admin User', 'admin');

-- Seed Students
INSERT INTO users (username, password, full_name, role) VALUES 
('asha.rao', 'student123', 'Asha Rao', 'student'),
('ravi.shetty', 'student123', 'Ravi Shetty', 'student'),
('meera.nair', 'student123', 'Meera Nair', 'student'),
('kiran.bhat', 'student123', 'Kiran Bhat', 'student'),
('divya.kamath', 'student123', 'Divya Kamath', 'student'),
('suresh.pai', 'student123', 'Suresh Pai', 'student'),
('ananya.hegde', 'student123', 'Ananya Hegde', 'student'),
('rohan.shenoy', 'student123', 'Rohan Shenoy', 'student'),
('nisha.prabhu', 'student123', 'Nisha Prabhu', 'student'),
('tejas.mallya', 'student123', 'Tejas Mallya', 'student'),
('priya.bangera', 'student123', 'Priya Bangera', 'student');

-- Seed Events (Dates relative to submission, e.g., July 2026)
INSERT INTO events (name, event_date, venue, max_capacity, created_by) VALUES
('Tech Symposium 2026', '2026-07-10', 'Main Auditorium', 120, 1),
('Hackathon', '2026-07-15', 'Lab Block C', 40, 1),
('Cultural Fest', '2026-07-20', 'Open Amphitheatre', 300, 1),
('Workshop: React Basics', '2026-07-22', 'Seminar Hall 2', 30, 1),
('Placement Prep Talk', '2026-07-25', 'Main Auditorium', 200, 1);
