import os

# Dossier contenant les fichiers
folder_path = "./"  # Remplace par le bon chemin

# Fichier texte pour enregistrer les noms
output_file = "drink_names.txt"

with open(output_file, "w") as file:
    for filename in os.listdir(folder_path):
        if filename.endswith(".webp"):
            # Extraire le nom sans extension
            drink_name = os.path.splitext(filename)[0]
            # Écrire dans le fichier
            file.write(drink_name + "\n")

print(f"Extraction terminée ! Les noms sont enregistrés dans {output_file}")
