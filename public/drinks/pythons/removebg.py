from rembg import remove
from PIL import Image
import os

# Dossier source et destination
input_folder = "./"
output_folder = "./output_images"

# Assurez-vous que le dossier de sortie existe
os.makedirs(output_folder, exist_ok=True)

# Parcourir toutes les images du dossier
for filename in os.listdir(input_folder):
    if filename.endswith((".png", ".jpg", ".jpeg", ".webp")):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename.replace(".jpg", ".png"))  # Convertir en PNG

        with open(input_path, "rb") as inp_file:
            img = Image.open(inp_file)
            img_no_bg = remove(img)  # Suppression du fond
            img_no_bg.save(output_path, "PNG")  # Sauvegarde sans fond

print("Suppression du background terminée !")
