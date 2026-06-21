// ============================================================
// PROYECTO EDTECH — MONGODB ATLAS
// Archivo 1: Estructura — Colecciones, Validadores e Índices
// BD: edtech | Ejecutar en Shell de Compass (EdTech2026)
// ============================================================

use("edtech");

// ============================================================
// 1. CREAR COLECCIONES CON VALIDADORES $jsonSchema
// ============================================================

db.createCollection("foro_hilos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["titulo", "contenido", "id_alumno", "id_curso", "fecha_creacion"],
      properties: {
        titulo:         { bsonType: "string" },
        contenido:      { bsonType: "string" },
        id_alumno:      { bsonType: "number" },
        id_curso:       { bsonType: "number" },
        etiquetas:      { bsonType: "array" },
        likes:          { bsonType: "number" },
        fecha_creacion: { bsonType: "date" },
        respuestas:     { bsonType: "array" }
      }
    }
  },
  validationLevel: "moderate"
});

db.createCollection("progreso_alumno", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id_alumno", "id_curso", "porcentaje_completado", "ultima_vez_visto"],
      properties: {
        id_alumno:             { bsonType: "number" },
        id_curso:              { bsonType: "number" },
        porcentaje_completado: { bsonType: "number" },
        ultima_vez_visto:      { bsonType: "date" },
        lecciones_completadas: { bsonType: "array" }
      }
    }
  },
  validationLevel: "moderate"
});

db.createCollection("materiales_curso", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id_leccion", "id_curso", "tipo", "titulo"],
      properties: {
        id_leccion:   { bsonType: "number" },
        id_curso:     { bsonType: "number" },
        tipo:         { bsonType: "string" },
        titulo:       { bsonType: "string" },
        url:          { bsonType: "string" },
        duracion_min: { bsonType: "number" },
        preguntas:    { bsonType: "array" }
      }
    }
  },
  validationLevel: "moderate"
});


// ============================================================
// 2. ÍNDICES
// ============================================================

// foro_hilos
db.foro_hilos.createIndex({ id_curso: 1 });
db.foro_hilos.createIndex({ id_alumno: 1 });
db.foro_hilos.createIndex({ etiquetas: 1 });
db.foro_hilos.createIndex({ fecha_creacion: -1 });

// progreso_alumno (único: un alumno solo tiene un progreso por curso)
db.progreso_alumno.createIndex({ id_alumno: 1, id_curso: 1 }, { unique: true });
db.progreso_alumno.createIndex({ id_curso: 1 });

// materiales_curso
db.materiales_curso.createIndex({ id_leccion: 1 });
db.materiales_curso.createIndex({ id_curso: 1 });
db.materiales_curso.createIndex({ tipo: 1 });


// ============================================================
// VERIFICAR COLECCIONES CREADAS
// ============================================================
db.getCollectionNames();
