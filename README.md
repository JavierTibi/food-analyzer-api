# 🍽️ Food Analyzer API

API desarrollada en TypeScript con Express que permite analizar imágenes de platos de comida. El sistema identifica los alimentos, devuelve sus macronutrientes, calorías estimadas y consejos personalizados para usuarios conscientes de su salud.

---

## 🚀 ¿Qué hace esta API?

1. **Recibe una imagen de comida (Por simplicidad se evito utilizar voz y texto)**.
2. **Guarda la imagen en Amazon S3** 
3. **Envía la URL pública a la API de Spoonacular**, que devuelve la información nutricional estimada. 
4. **Devuelve al usuario** los datos nutricionales y sugerencias relevantes.

```bash 
{
    "imageUrl": "https://food-analyzer-api.s3.us-east-1.amazonaws.com/uploads/1746562565819-istockphoto-1295633127-612x612.jpg",
    "analysis": {
        "status": "success",
        "nutrition": {
            "recipesUsed": 4,
            "calories": {
                "value": 282,
                "unit": "calories",
                "confidenceRange95Percent": {
                    "min": -2.52,
                    "max": 687.63
                },
                "standardDeviation": 352.12
            },
            "fat": {
                "value": 16,
                "unit": "g",
                "confidenceRange95Percent": {
                    "min": -1.34,
                    "max": 43.43
                },
                "standardDeviation": 22.84
            },
            "protein": {
                "value": 10,
                "unit": "g",
                "confidenceRange95Percent": {
                    "min": -0.32,
                    "max": 24.24
                },
                "standardDeviation": 12.53
            },
            "carbs": {
                "value": 26,
                "unit": "g",
                "confidenceRange95Percent": {
                    "min": 1.85,
                    "max": 53.98
                },
                "standardDeviation": 26.6
            }
        },
        "category": {
            "name": "agnolotti",
            "probability": 0.7825075834175935
        }
    }
}
```

---

## 📦 Tecnologías y servicios utilizados

### 🟦 TypeScript + Express
- Base sólida para construir una API mantenible y escalable.
- Middleware modular para procesamiento de imágenes, carga a S3, y validaciones.

### 🐳 Docker
- Entorno de desarrollo y producción reproducible.
- La API puede correr de forma idéntica en cualquier sistema que tenga Docker instalado.
- No requiere instalar Node.js localmente.

### 🧠 Spoonacular API
- Elegida por su **especialización en datos nutricionales** y **detección de alimentos por imagen**.
- A diferencia de modelos genéricos como ChatGPT, Spoonacular ofrece una **API optimizada y entrenada para análisis de comida**, su modelo de análisis por imagen está entrenado específicamente para reconocer alimentos y calcular calorías, macros y porciones
- Endpoint usado: `GET https://api.spoonacular.com/food/images/analyze`

### 🪣 Amazon S3
- Las imágenes se almacenan en S3 con acceso público para que puedan ser consumidas por Spoonacular.
- Se usa `@aws-sdk/client-s3` y `multer-s3` para la carga.

---

## 📄 Notas importantes

- La API de Spoonacular requiere una **clave personal (`apiKey`)** que debe ser almacenada en `.env`.
- El bucket de S3 debe estar configurado para **permitir acceso público** a los objetos.
- Por motivos de tiempo y simplicidad:
  - No se implementó autenticación.
  - No se validan todos los edge cases.
  - El análisis se limita a la respuesta directa de Spoonacular sin procesar profundamente los resultados.

---

## 📥 Variables de entorno requeridas

En el archivo `.env` deben configurarse las siguientes variables:

```env
PORT=4000
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_BUCKET_NAME=
SPOONACULAR_API_KEY=
```


