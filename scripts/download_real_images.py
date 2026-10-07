import os
import urllib.request
import time
from PIL import Image
import io

output_dir = os.path.abspath('public/images')
os.makedirs(output_dir, exist_ok=True)

# Mapeo de fotos de alta resolución temáticas de Unsplash
images_map = {
    # 1. Hero & Secciones Principales
    'hero-cargo-ship.jpg': 'https://images.unsplash.com/photo-1542314831-c6a4d27e289f?auto=format&fit=crop&w=1200&q=80', # Gran buque portacontenedores
    'hero-truck.jpg': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80', # Camión moderno de carga
    'hero-plane.jpg': 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80', # Avión de carga en pista
    'hero-containers.jpg': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', # Terminal portuario de contenedores
    'about-operation.jpg': 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1000&q=80', # Operación logística puerto
    'about-warehouse.jpg': 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80', # Almacén moderno

    # 2. Servicios
    'service-maritime.jpg': 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80', # Transporte marítimo
    'service-air.jpg': 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=800&q=80', # Carga aérea
    'service-land.jpg': 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80', # Transporte terrestre
    'service-customs.jpg': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80', # Gestión aduanera y documentos
    'service-warehousing.jpg': 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80', # Almacén logístico
    'service-machinery-parts.jpg': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', # Repuestos e ingeniería
    'service-consulting.jpg': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80', # Asesoría comercio exterior
    'promo-banner-1.jpg': 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80', # Repuestos y componentes
    'promo-banner-2.jpg': 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1000&q=80', # Maquinaria pesada

    # 3. Categorías de Repuestos
    'cat-motor.jpg': 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80', # Motor diésel pesado
    'cat-hydraulic.jpg': 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80', # Sistema hidráulico
    'cat-undercarriage.jpg': 'https://images.unsplash.com/photo-1508873696983-2df57046475a?auto=format&fit=crop&w=800&q=80', # Tren de rodaje / orugas
    'cat-transmission.jpg': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80', # Transmisión y engranajes
    'cat-brakes.jpg': 'https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&w=800&q=80', # Sistema de frenos
    'cat-electric.jpg': 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80', # Sistema eléctrico
    'cat-filters.jpg': 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80', # Filtros
    'cat-bucket.jpg': 'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?auto=format&fit=crop&w=800&q=80', # Cucharón y dientes excavadora

    # 4. Productos Individuales
    'product-turbo.jpg': 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80', # Turbo Garrett
    'product-injection-pump.jpg': 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=600&q=80', # Bomba inyección
    'product-pistons.jpg': 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80', # Pistones motor
    'product-hydraulic-pump.jpg': 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=600&q=80', # Bomba hidráulica
    'product-hydraulic-cylinder.jpg': 'https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?auto=format&fit=crop&w=600&q=80', # Cilindro hidráulico
    'product-seals-kit.jpg': 'https://images.unsplash.com/photo-1580983561371-7f4520337854?auto=format&fit=crop&w=600&q=80', # Kit sellos
    'product-track-chain.jpg': 'https://images.unsplash.com/photo-1508873696983-2df57046475a?auto=format&fit=crop&w=600&q=80', # Cadena de oruga
    'product-roller.jpg': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80', # Rodillo oruga
    'product-idler.jpg': 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80', # Rueda guía idler
    'product-torque-converter.jpg': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80', # Convertidor par
    'product-clutch-disc.jpg': 'https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&w=600&q=80', # Disco embrague
    'product-brake-disc.jpg': 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80', # Disco freno
    'product-brake-valve.jpg': 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=600&q=80', # Válvula freno
    'product-alternator.jpg': 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80', # Alternador 24V
    'product-starter.jpg': 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80', # Motor arranque
    'product-sensors.jpg': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80', # Sensores electrónicos
    'product-filter.jpg': 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80', # Filtro Donaldson
    'product-fuel-separator.jpg': 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80', # Separador combustible
    'product-bucket-teeth.jpg': 'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?auto=format&fit=crop&w=600&q=80', # Dientes cucharón J350
    'product-blade.jpg': 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=600&q=80', # Cuchilla HB500

    # 5. Equipo Humano
    'team-1.jpg': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80', # Ing. Carlos Mendoza
    'team-2.jpg': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', # Lic. Mariana Paredes
    'team-3.jpg': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80', # Ing. Roberto Alarcón
    'team-4.jpg': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80', # Valeria Quispe
}

print(f'Descargando {len(images_map)} fotografías reales en alta calidad...')

for filename, url in images_map.items():
    filepath = os.path.join(output_dir, filename)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=12) as response:
            content = response.read()
            # Validar que sea imagen y convertir a JPEG auténtico
            img = Image.open(io.BytesIO(content))
            img = img.convert('RGB')
            img.save(filepath, 'JPEG', quality=85, optimize=True)
            print(f'✓ {filename} ({img.size[0]}x{img.size[1]}px)')
        time.sleep(0.08)
    except Exception as e:
        print(f'Error en {filename}: {e}')

print('¡Todas las imágenes descargadas y optimizadas!')
