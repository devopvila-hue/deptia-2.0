# Deptia 2.0

Relevo vigente: [docs/ROSA-DEPTIA-2.0-20261030.md](docs/ROSA-DEPTIA-2.0-20261030.md). Implementación local completa y verificada; no publicada.

- Toda afirmación comercial nueva necesita evidencia en el código del portal/backend y una fila en `docs/VERIFICACION-AFIRMACIONES.md`.
- El texto vive en `messages/*.json`. Al cambiar el español, actualiza los siete idiomas: `npm test` falla si faltan claves o si queda una frase en español.
- No quitar `noindex` (`NEXT_PUBLIC_INDEXABLE`) ni desplegar sobre `departify.app` sin OK explícito del operador.
