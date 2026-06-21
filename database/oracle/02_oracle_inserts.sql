-- ============================================================
-- PROYECTO EDTECH — DATOS DE MUESTRA
-- Usuario: edtech_admin | Servicio: pdb_edtech
-- Ejecutar desde la conexión EdTech-Admin
-- ============================================================

-- ============================================================
-- 1. CATEGORIA (6 registros)
-- ============================================================
INSERT INTO CATEGORIA VALUES (SEQ_CATEGORIA.NEXTVAL, 'Programación',   'Cursos de desarrollo de software y programación');
INSERT INTO CATEGORIA VALUES (SEQ_CATEGORIA.NEXTVAL, 'Diseño',         'Diseño gráfico, UI/UX y creatividad digital');
INSERT INTO CATEGORIA VALUES (SEQ_CATEGORIA.NEXTVAL, 'Base de Datos',  'Gestión y administración de bases de datos');
INSERT INTO CATEGORIA VALUES (SEQ_CATEGORIA.NEXTVAL, 'Redes',          'Infraestructura, redes y seguridad informática');
INSERT INTO CATEGORIA VALUES (SEQ_CATEGORIA.NEXTVAL, 'Data Science',   'Análisis de datos, machine learning e IA');
INSERT INTO CATEGORIA VALUES (SEQ_CATEGORIA.NEXTVAL, 'Negocios',       'Emprendimiento, marketing y gestión empresarial');

COMMIT;

-- ============================================================
-- 2. INSTRUCTOR (8 registros)
-- ============================================================
INSERT INTO INSTRUCTOR VALUES (SEQ_INSTRUCTOR.NEXTVAL, 'Carlos',    'Mendoza',   'cmendoza@edtech.pe',   'Ingeniero de Software con 10 años de experiencia en desarrollo web.',       SYSDATE);
INSERT INTO INSTRUCTOR VALUES (SEQ_INSTRUCTOR.NEXTVAL, 'María',     'Quispe',    'mquispe@edtech.pe',    'Diseñadora UX/UI especializada en experiencias digitales.',                  SYSDATE);
INSERT INTO INSTRUCTOR VALUES (SEQ_INSTRUCTOR.NEXTVAL, 'José',      'Castillo',  'jcastillo@edtech.pe',  'DBA Oracle certificado con 8 años en administración de bases de datos.',    SYSDATE);
INSERT INTO INSTRUCTOR VALUES (SEQ_INSTRUCTOR.NEXTVAL, 'Ana',       'Torres',    'atorres@edtech.pe',    'Especialista en redes Cisco y seguridad informática.',                       SYSDATE);
INSERT INTO INSTRUCTOR VALUES (SEQ_INSTRUCTOR.NEXTVAL, 'Luis',      'Vargas',    'lvargas@edtech.pe',    'Data Scientist con experiencia en Python, R y modelos de ML.',              SYSDATE);
INSERT INTO INSTRUCTOR VALUES (SEQ_INSTRUCTOR.NEXTVAL, 'Rosa',      'Huanca',    'rhuanca@edtech.pe',    'Consultora de negocios y emprendimiento digital.',                           SYSDATE);
INSERT INTO INSTRUCTOR VALUES (SEQ_INSTRUCTOR.NEXTVAL, 'Diego',     'Salinas',   'dsalinas@edtech.pe',   'Desarrollador fullstack con especialización en Node.js y React.',           SYSDATE);
INSERT INTO INSTRUCTOR VALUES (SEQ_INSTRUCTOR.NEXTVAL, 'Patricia',  'Flores',    'pflores@edtech.pe',    'Experta en MongoDB y bases de datos NoSQL.',                                 SYSDATE);

COMMIT;

-- ============================================================
-- 3. CURSO (12 registros)
-- ID_CATEGORIA: 1=Prog, 2=Diseño, 3=BD, 4=Redes, 5=DataSci, 6=Negocios
-- ID_INSTRUCTOR: 1=Mendoza, 2=Quispe, 3=Castillo, 4=Torres, 5=Vargas, 6=Huanca, 7=Salinas, 8=Flores
-- ============================================================
INSERT INTO CURSO VALUES (SEQ_CURSO.NEXTVAL, 'JavaScript desde Cero',           'Fundamentos de JS moderno, ES6+, DOM y asincronismo.',         149.90, 40,   'BASICO',       1, 1, SYSDATE, 1);
INSERT INTO CURSO VALUES (SEQ_CURSO.NEXTVAL, 'React + Node.js Fullstack',        'Desarrollo de aplicaciones web completas con React y Express.', 299.90, 80,   'INTERMEDIO',   1, 7, SYSDATE, 1);
INSERT INTO CURSO VALUES (SEQ_CURSO.NEXTVAL, 'Diseño UI/UX con Figma',           'Prototipado y diseño de interfaces profesionales.',            199.90, 35,   'BASICO',       2, 2, SYSDATE, 1);
INSERT INTO CURSO VALUES (SEQ_CURSO.NEXTVAL, 'Adobe Illustrator para Web',       'Vectores, branding y assets para desarrollo web.',            179.90, 30,   'INTERMEDIO',   2, 2, SYSDATE, 1);
INSERT INTO CURSO VALUES (SEQ_CURSO.NEXTVAL, 'Oracle Database 21c Completo',     'Administración, PL/SQL, seguridad y performance tuning.',      349.90, 90,   'AVANZADO',     3, 3, SYSDATE, 1);
INSERT INTO CURSO VALUES (SEQ_CURSO.NEXTVAL, 'MongoDB para Desarrolladores',     'Modelado de documentos, índices, agregaciones y Atlas.',       249.90, 55,   'INTERMEDIO',   3, 8, SYSDATE, 1);
INSERT INTO CURSO VALUES (SEQ_CURSO.NEXTVAL, 'Redes con Cisco CCNA',             'Fundamentos de redes, protocolos TCP/IP y configuración.',     279.90, 70,   'BASICO',       4, 4, SYSDATE, 1);
INSERT INTO CURSO VALUES (SEQ_CURSO.NEXTVAL, 'Ciberseguridad Ofensiva',          'Ethical hacking, pentesting y análisis de vulnerabilidades.',  399.90, 100,  'AVANZADO',     4, 4, SYSDATE, 1);
INSERT INTO CURSO VALUES (SEQ_CURSO.NEXTVAL, 'Python para Data Science',         'Pandas, NumPy, visualización y análisis de datos reales.',     229.90, 60,   'BASICO',       5, 5, SYSDATE, 1);
INSERT INTO CURSO VALUES (SEQ_CURSO.NEXTVAL, 'Machine Learning con Scikit-learn','Regresión, clasificación, clustering y evaluación de modelos.',329.90, 75,   'AVANZADO',     5, 5, SYSDATE, 1);
INSERT INTO CURSO VALUES (SEQ_CURSO.NEXTVAL, 'Marketing Digital',                'SEO, SEM, redes sociales y estrategia de contenidos.',        189.90, 45,   'BASICO',       6, 6, SYSDATE, 1);
INSERT INTO CURSO VALUES (SEQ_CURSO.NEXTVAL, 'Emprendimiento Tech',              'Cómo lanzar una startup tecnológica desde cero.',              219.90, 50,   'INTERMEDIO',   6, 6, SYSDATE, 1);

COMMIT;

-- ============================================================
-- 4. LECCION (36 registros — 3 por curso)
-- ============================================================
-- Curso 1: JavaScript desde Cero
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Variables, tipos y operadores',   'Fundamentos del lenguaje',      1, 60, 1);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Funciones y closures',            'Funciones flecha y scope',      2, 75, 1);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Promesas y async/await',          'Programación asíncrona',        3, 90, 1);
-- Curso 2: React + Node.js Fullstack
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Componentes y props en React',    'Fundamentos de React',          1, 80, 2);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Hooks: useState y useEffect',     'Gestión de estado',             2, 90, 2);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'API REST con Express',            'Backend con Node.js',           3, 100, 2);
-- Curso 3: Diseño UI/UX con Figma
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Principios de diseño visual',     'Color, tipografía y layout',    1, 60, 3);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Wireframes y prototipos',         'Del sketch al prototipo',       2, 70, 3);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Design System y componentes',     'Reutilización en Figma',        3, 80, 3);
-- Curso 4: Adobe Illustrator
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Herramientas básicas de vector',  'Formas, trazados y rellenos',   1, 55, 4);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Diseño de logotipos',             'Branding desde cero',           2, 65, 4);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Exportar assets para web',        'SVG, PNG y formatos web',       3, 50, 4);
-- Curso 5: Oracle Database 21c
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Arquitectura CDB y PDB',         'Estructura del motor Oracle',   1, 90, 5);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'PL/SQL: procedimientos y funciones', 'Programación en Oracle',    2, 100, 5);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Seguridad: perfiles y auditoría', 'Control de acceso',            3, 85, 5);
-- Curso 6: MongoDB para Desarrolladores
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Modelado de documentos',         'Esquemas flexibles',            1, 70, 6);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Índices y performance',          'Optimización de consultas',     2, 80, 6);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Aggregation Pipeline',           'Consultas avanzadas',           3, 90, 6);
-- Curso 7: Redes Cisco CCNA
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Modelo OSI y TCP/IP',            'Fundamentos de redes',          1, 75, 7);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Configuración básica de routers','CLI de Cisco IOS',              2, 85, 7);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'VLANs y switching',              'Segmentación de red',           3, 90, 7);
-- Curso 8: Ciberseguridad Ofensiva
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Reconocimiento y escaneo',       'Nmap y OSINT',                  1, 95, 8);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Explotación con Metasploit',     'Vectores de ataque',            2, 110, 8);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Post-explotación y reportes',    'Entregables de pentest',        3, 100, 8);
-- Curso 9: Python para Data Science
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Pandas: limpieza de datos',      'DataFrame y Series',            1, 80, 9);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Visualización con Matplotlib',   'Gráficos y análisis visual',    2, 70, 9);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Análisis estadístico básico',    'Media, varianza y correlación', 3, 75, 9);
-- Curso 10: Machine Learning
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Regresión lineal y logística',   'Modelos supervisados básicos',  1, 90, 10);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Árboles de decisión y Random Forest', 'Ensemble methods',        2, 100, 10);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Evaluación de modelos',          'Métricas y validación cruzada', 3, 85, 10);
-- Curso 11: Marketing Digital
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'SEO On-Page y Off-Page',         'Posicionamiento orgánico',      1, 65, 11);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Google Ads y SEM',               'Publicidad pagada',             2, 70, 11);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Estrategia en redes sociales',   'Content marketing',             3, 60, 11);
-- Curso 12: Emprendimiento Tech
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Validación de idea de negocio',  'Lean Startup y MVP',            1, 75, 12);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Pitch y búsqueda de inversión',  'Cómo presentar tu startup',     2, 80, 12);
INSERT INTO LECCION VALUES (SEQ_LECCION.NEXTVAL, 'Growth hacking',                 'Crecimiento con bajo presupuesto', 3, 70, 12);

COMMIT;

-- ============================================================
-- 5. ALUMNO (30 registros)
-- PASSWORD_HASH: hash bcrypt simulado (en producción lo genera el backend)
-- ============================================================
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Piero',     'Villón',       'pvillon@gmail.com',       '$2b$10$hashed_password_001', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Andrea',    'Ríos',         'arios@gmail.com',          '$2b$10$hashed_password_002', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Miguel',    'Espinoza',     'mespinoza@gmail.com',      '$2b$10$hashed_password_003', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Valeria',   'Chávez',       'vchavez@gmail.com',        '$2b$10$hashed_password_004', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Fernando',  'Paredes',      'fparedes@hotmail.com',     '$2b$10$hashed_password_005', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Lucía',     'Mamani',       'lmamani@gmail.com',        '$2b$10$hashed_password_006', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Rodrigo',   'Benites',      'rbenites@gmail.com',       '$2b$10$hashed_password_007', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Camila',    'Rojas',        'crojas@outlook.com',       '$2b$10$hashed_password_008', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Kevin',     'Sánchez',      'ksanchez@gmail.com',       '$2b$10$hashed_password_009', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Daniela',   'Huamán',       'dhuaman@gmail.com',        '$2b$10$hashed_password_010', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Sebastián', 'Córdova',      'scordova@gmail.com',       '$2b$10$hashed_password_011', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Natalia',   'Ponce',        'nponce@gmail.com',         '$2b$10$hashed_password_012', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Javier',    'Gutierrez',    'jgutierrez@hotmail.com',   '$2b$10$hashed_password_013', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Sofía',     'Llerena',      'sllerena@gmail.com',       '$2b$10$hashed_password_014', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Aarón',     'Medina',       'amedina@gmail.com',        '$2b$10$hashed_password_015', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Isabella',  'Zapata',       'izapata@outlook.com',      '$2b$10$hashed_password_016', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Mateo',     'Alvarado',     'malvarado@gmail.com',      '$2b$10$hashed_password_017', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Fernanda',  'Cruz',         'fcruz@gmail.com',          '$2b$10$hashed_password_018', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Gonzalo',   'Ramos',        'gramos@gmail.com',         '$2b$10$hashed_password_019', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Mariana',   'Delgado',      'mdelgado@hotmail.com',     '$2b$10$hashed_password_020', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Nicolás',   'Herrera',      'nherrera@gmail.com',       '$2b$10$hashed_password_021', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Alejandra', 'Vega',         'avega@gmail.com',          '$2b$10$hashed_password_022', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Cristian',  'Tapia',        'ctapia@outlook.com',       '$2b$10$hashed_password_023', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Paola',     'Hidalgo',      'phidalgo@gmail.com',       '$2b$10$hashed_password_024', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Andrés',    'Moran',        'amoran@gmail.com',         '$2b$10$hashed_password_025', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Valentina', 'Suárez',       'vsuarez@gmail.com',        '$2b$10$hashed_password_026', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Renato',    'Cáceres',      'rcaceres@hotmail.com',     '$2b$10$hashed_password_027', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Xiomara',   'Núñez',        'xnunez@gmail.com',         '$2b$10$hashed_password_028', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Emilio',    'Reyes',        'ereyes@gmail.com',         '$2b$10$hashed_password_029', SYSDATE, 1);
INSERT INTO ALUMNO VALUES (SEQ_ALUMNO.NEXTVAL, 'Gabriela',  'Fuentes',      'gfuentes@outlook.com',     '$2b$10$hashed_password_030', SYSDATE, 1);

COMMIT;

-- ============================================================
-- 6. MATRICULA (35 registros)
-- Alumnos 1-30, Cursos 1-12 (sin repetir la misma combinación)
-- ============================================================
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  1,  1, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  1,  5, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  2,  3, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  2,  9, SYSDATE, 'COMPLETADO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  3,  2, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  3,  6, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  4,  1, SYSDATE, 'COMPLETADO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  4,  4, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  5,  7, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  5, 10, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  6,  3, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  6, 11, SYSDATE, 'COMPLETADO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  7,  2, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  7,  8, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  8,  5, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  8, 12, SYSDATE, 'CANCELADO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  9,  1, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL,  9,  6, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 10,  9, SYSDATE, 'COMPLETADO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 10,  2, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 11,  4, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 12,  7, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 13,  5, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 14,  3, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 15, 10, SYSDATE, 'COMPLETADO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 16,  1, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 17,  6, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 18,  2, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 19,  8, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 20, 11, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 21,  3, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 22,  9, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 23, 12, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 24,  5, SYSDATE, 'ACTIVO');
INSERT INTO MATRICULA VALUES (SEQ_MATRICULA.NEXTVAL, 25,  7, SYSDATE, 'ACTIVO');

COMMIT;

-- ============================================================
-- 7. SUSCRIPCION (30 registros)
-- ============================================================
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL,  1, 'MENSUAL', 29.90, SYSDATE, ADD_MONTHS(SYSDATE,1),  'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL,  2, 'ANUAL',  199.90, SYSDATE, ADD_MONTHS(SYSDATE,12), 'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL,  3, 'UNICO',  149.90, SYSDATE, NULL,                   'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL,  4, 'MENSUAL', 29.90, SYSDATE, ADD_MONTHS(SYSDATE,1),  'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL,  5, 'ANUAL',  199.90, SYSDATE, ADD_MONTHS(SYSDATE,12), 'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL,  6, 'UNICO',  249.90, SYSDATE, NULL,                   'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL,  7, 'MENSUAL', 29.90, SYSDATE, ADD_MONTHS(SYSDATE,1),  'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL,  8, 'ANUAL',  199.90, ADD_MONTHS(SYSDATE,-13), ADD_MONTHS(SYSDATE,-1), 'EXPIRADO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL,  9, 'UNICO',  299.90, SYSDATE, NULL,                   'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 10, 'MENSUAL', 29.90, SYSDATE, ADD_MONTHS(SYSDATE,1),  'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 11, 'ANUAL',  199.90, SYSDATE, ADD_MONTHS(SYSDATE,12), 'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 12, 'UNICO',  179.90, SYSDATE, NULL,                   'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 13, 'MENSUAL', 29.90, SYSDATE, ADD_MONTHS(SYSDATE,1),  'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 14, 'ANUAL',  199.90, SYSDATE, ADD_MONTHS(SYSDATE,12), 'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 15, 'UNICO',  329.90, SYSDATE, NULL,                   'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 16, 'MENSUAL', 29.90, ADD_MONTHS(SYSDATE,-2), ADD_MONTHS(SYSDATE,-1), 'CANCELADO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 17, 'ANUAL',  199.90, SYSDATE, ADD_MONTHS(SYSDATE,12), 'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 18, 'UNICO',  229.90, SYSDATE, NULL,                   'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 19, 'MENSUAL', 29.90, SYSDATE, ADD_MONTHS(SYSDATE,1),  'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 20, 'ANUAL',  199.90, SYSDATE, ADD_MONTHS(SYSDATE,12), 'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 21, 'UNICO',  189.90, SYSDATE, NULL,                   'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 22, 'MENSUAL', 29.90, SYSDATE, ADD_MONTHS(SYSDATE,1),  'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 23, 'ANUAL',  199.90, ADD_MONTHS(SYSDATE,-14), ADD_MONTHS(SYSDATE,-2), 'EXPIRADO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 24, 'UNICO',  349.90, SYSDATE, NULL,                   'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 25, 'MENSUAL', 29.90, SYSDATE, ADD_MONTHS(SYSDATE,1),  'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 26, 'ANUAL',  199.90, SYSDATE, ADD_MONTHS(SYSDATE,12), 'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 27, 'UNICO',  219.90, SYSDATE, NULL,                   'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 28, 'MENSUAL', 29.90, SYSDATE, ADD_MONTHS(SYSDATE,1),  'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 29, 'ANUAL',  199.90, SYSDATE, ADD_MONTHS(SYSDATE,12), 'ACTIVO');
INSERT INTO SUSCRIPCION VALUES (SEQ_SUSCRIPCION.NEXTVAL, 30, 'UNICO',  299.90, SYSDATE, NULL,                   'ACTIVO');

COMMIT;

-- ============================================================
-- 8. CALIFICACION (30 registros)
-- ID_MATRICULA va del 1 al 35 — usamos 1 al 30
-- NOTA: escala vigesimal 0-20
-- ============================================================
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL,  1, 17.5, 'Excelente dominio de JS moderno',          SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL,  2, 15.0, 'Buen desempeño en Oracle',                  SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL,  3, 18.0, 'Diseño UI/UX muy profesional',              SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL,  4, 14.0, 'Aprobado, mejorar en análisis de datos',    SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL,  5, 16.5, 'Buen manejo de redes Cisco',                SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL,  6, 13.0, 'En riesgo, necesita reforzar MongoDB',      SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL,  7, 19.0, 'Desarrollo fullstack sobresaliente',        SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL,  8, 11.5, 'Aprobado con dificultades',                 SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL,  9, 15.5, 'Buen manejo de JavaScript',                 SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 10, 14.5, 'Python aplicado correctamente',             SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 11, 16.0, 'Diseño Illustrator competente',             SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 12, 18.5, 'Excelente conocimiento de redes',           SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 13, 12.0, 'Aprobado, mejorar profundidad en Oracle',   SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 14, 17.0, 'Buen dominio de UI/UX',                     SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 15, 20.0, 'Nota máxima, excelente en ML',              SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 16, 13.5, 'Aprobado',                                  SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 17, 16.0, 'Buen trabajo en MongoDB',                   SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 18, 15.0, 'Correcto desarrollo React',                 SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 19, 14.0, 'Aprobado en ciberseguridad',                SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 20, 17.5, 'Excelente en marketing digital',            SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 21, 11.0, 'En riesgo, reforzar conceptos de UI/UX',    SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 22, 18.0, 'Muy buen análisis de datos en Python',      SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 23, 16.5, 'Buen proyecto de emprendimiento',           SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 24, 15.5, 'Dominio sólido de Oracle',                  SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 25, 19.5, 'Excelente en redes Cisco',                  SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 26, 13.0, 'Aprobado en JavaScript',                    SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 27, 14.5, 'Buen avance en MongoDB',                    SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 28, 12.5, 'Aprobado',                                  SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 29, 17.0, 'Excelente presentación final',              SYSDATE);
INSERT INTO CALIFICACION VALUES (SEQ_CALIFICACION.NEXTVAL, 30, 16.0, 'Buen manejo general del curso',             SYSDATE);

COMMIT;

-- ============================================================
-- VERIFICACIÓN FINAL
-- ============================================================
SELECT 'CATEGORIA'    AS TABLA, COUNT(*) AS REGISTROS FROM CATEGORIA
UNION ALL SELECT 'INSTRUCTOR',  COUNT(*) FROM INSTRUCTOR
UNION ALL SELECT 'CURSO',       COUNT(*) FROM CURSO
UNION ALL SELECT 'LECCION',     COUNT(*) FROM LECCION
UNION ALL SELECT 'ALUMNO',      COUNT(*) FROM ALUMNO
UNION ALL SELECT 'MATRICULA',   COUNT(*) FROM MATRICULA
UNION ALL SELECT 'SUSCRIPCION', COUNT(*) FROM SUSCRIPCION
UNION ALL SELECT 'CALIFICACION',COUNT(*) FROM CALIFICACION;
