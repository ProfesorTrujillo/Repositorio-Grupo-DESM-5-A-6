# Portafolio de Evidencias

![Angular](https://img.shields.io/badge/Angular-21.1.1-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Firestore](https://img.shields.io/badge/Firestore-FF6F00?style=for-the-badge&logo=firebase&logoColor=white)

---

**Nombre del alumno:** Carlos Santiago Delgado Oliva

**Grupo y Carrera:**
Tecnologías de la Información — Desarrollo de Software Multiplataforma
Universidad Tecnológica de Aguascalientes

**Docente:** Mtro. Francisco Javier Trujillo Silva

---

## Descripción del Proyecto

Proyecto basado en Angular sobre un restaurante de nombre "Los Primos y el Aceite" de comida mexicana. También se adjunta un segundo proyecto de Angular basado en una tienda de productos de electrónica y gadgets varios.

Ambos proyectos integran Firebase como backend, Firestore como base de datos en tiempo real, Firebase Authentication para el manejo de sesiones y Stripe como pasarela de pagos.

---

## Actividades integradas

| Clave | Actividad | Evidencia en el proyecto |
|-------|-----------|--------------------------|
| ![AA3.3](https://img.shields.io/badge/AA_3.3-Conociendo_Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black) | Conociendo Firebase antes de Angular | Configuración inicial del proyecto Firebase vinculado a la app |
| ![AA3.3.1](https://img.shields.io/badge/AA_3.3.1-Entorno_Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black) | Configuración del entorno en Firebase | Archivo `environment.ts` con credenciales y configuración del SDK |
| ![AA3.3.2](https://img.shields.io/badge/AA_3.3.2-Verificación-FFCA28?style=flat-square&logo=firebase&logoColor=black) | Verificación y validación de Firebase | Conexión verificada con consola Firebase y pruebas de conectividad |
| ![AA3.3.3](https://img.shields.io/badge/AA_3.3.3-Integración-DD0031?style=flat-square&logo=angular&logoColor=white) | Integración de Firebase en Angular 21.1.1 | Módulo `provideFirebaseApp` y `provideFirestore` registrados en `app.config.ts` |
| ![AA3.3.4](https://img.shields.io/badge/AA_3.3.4-Auth-4285F4?style=flat-square&logo=googleidentityplatform&logoColor=white) | Login y Registro con Firebase Authentication | Pantallas de login y registro funcionales con `FirebaseAuth` y guards de rutas |
| ![AA3.5](https://img.shields.io/badge/AA_3.5-CRUD_Firestore-FF6F00?style=flat-square&logo=firebase&logoColor=white) | CRUD completo con Angular y Firestore | Módulos de menú y pedidos con operaciones create, read, update y delete sobre Firestore |
| ![AA3.6](https://img.shields.io/badge/AA_3.6-APIs_Comunicación-008CDD?style=flat-square&logo=stripe&logoColor=white) | Integración de APIs de Comunicación | Stripe para cobros |

---

## Tecnologías utilizadas

![Angular](https://img.shields.io/badge/Angular_21.1.1-DD0031?style=flat-square&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Firestore](https://img.shields.io/badge/Firestore-FF6F00?style=flat-square&logo=firebase&logoColor=white)
![Firebase Auth](https://img.shields.io/badge/Firebase_Auth-4285F4?style=flat-square&logo=googleidentityplatform&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=flat-square&logo=stripe&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)

---

## Pasos para ejecutar el proyecto

### ![Firebase](https://img.shields.io/badge/Proyecto_1-Restaurante_Los_Primos_y_el_Aceite-FFCA28?style=flat-square&logo=firebase&logoColor=black) `practica2.4-3.3.4`

> Cubre las actividades AA 3.3 — AA 3.3.4

```bash
# 1. Clonar el repositorio en la rama correspondiente
git clone -b carlossantiagodelgadooliva https://github.com/ProfesorTrujillo/Repositorio-Grupo-DESM-5-A-6.git

# 2. Entrar a la carpeta del primer proyecto
cd Repositorio-Grupo-DESM-5-A-6/practica2.4-3.3.4

# 3. Instalar dependencias
npm install

# 4. Ejecutar la aplicación
ng serve
```

> Disponible en `http://localhost:4200`

---

### ![Stripe](https://img.shields.io/badge/Proyecto_2-Tienda_de_Electrónica-008CDD?style=flat-square&logo=stripe&logoColor=white) `practica3.4-3.6`

> Cubre las actividades AA 3.5 — AA 3.6

```bash
# 1. (Si ya clonaste el repo, omite este paso)
git clone -b carlossantiagodelgadooliva https://github.com/ProfesorTrujillo/Repositorio-Grupo-DESM-5-A-6.git

# 2. Entrar a la carpeta del segundo proyecto
cd Repositorio-Grupo-DESM-5-A-6/practica3.4-3.6

# 3. Instalar dependencias
npm install

# 4. Ejecutar la aplicación
ng serve
```

> Disponible en `http://localhost:4200`

---

> Asegúrate de tener configuradas las credenciales de Firebase en `src/environments/environment.ts` en cada proyecto antes de ejecutar.