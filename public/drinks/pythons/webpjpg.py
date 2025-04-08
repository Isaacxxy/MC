import os
from PIL import Image

def convert_webp_to_png(input_folder, output_folder):
    os.makedirs(output_folder, exist_ok=True)

    for filename in os.listdir(input_folder):
        if filename.lower().endswith('.webp'):
            webp_path = os.path.join(input_folder, filename)
            png_name = os.path.splitext(filename)[0] + '.png'
            png_path = os.path.join(output_folder, png_name)

            try:
                with Image.open(webp_path) as img:
                    img.save(png_path, 'PNG')  # pas de conversion RGB, on garde la transparence
                print(f"[✓] {filename} → {png_name}")
            except Exception as e:
                print(f"[!] Erreur avec {filename} : {e}")

if __name__ == "__main__":
    input_folder = r"C:\Users\isaac\Desktop\MC-TP\Code\PaginaEspresso\mc\public\drinks\output_images"
    output_folder = r"C:\Users\isaac\Desktop\MC-TP\Code\PaginaEspresso\mc\public\drinks\png"

    convert_webp_to_png(input_folder, output_folder)
