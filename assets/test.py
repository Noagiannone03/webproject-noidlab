import tkinter as tk
import threading
import time
import random
import pyautogui
import math

# Flags de contrôle pour le thread d'automatisation
running = False # True = automation active, False = en pause
stop_thread = False  # True = arrêt du thread
last_set_position = None  # Dernière position fixée par le script

def stop(): 
    """
    Arrête le thread d'automatisation et ferme l'application.
    """
    global stop_thread
    stop_thread = True
    root.quit()

def automation():
    """
    Boucle d'automatisation qui déplace la souris de manière aléatoire sur tout l'écran.
    La position est calculée avec wrap-around pour éviter de se bloquer sur les bords.
    Si un mouvement manuel (écart >20 pixels par rapport à la dernière position) est détecté, le programme s'arrête.
    """
    global running, stop_thread, last_set_position
    screen_width, screen_height = pyautogui.size()
    last_set_position = pyautogui.position()
    
    while not stop_thread:
        if running:
            # Récupère la position actuelle de la souris
            current_x, current_y = pyautogui.position()
            # Calcul de la distance par rapport à la dernière position fixée par le script
            distance = math.hypot(current_x - last_set_position[0], current_y - last_set_position[1])
            if distance > 20:
                print("Mouvement manuel détecté. Arrêt de l'automatisation.")
                stop()
                break

            # Déplacements plus grands : ±200 pixels
            delta_x = random.randint(-200, 200)
            delta_y = random.randint(-200, 200)
            # Calcul de la nouvelle position avec wrap-around pour rester sur l'écran
            new_x = (current_x + delta_x) % screen_width
            new_y = (current_y + delta_y) % screen_height
            # Durée du mouvement pour un effet "puls" rapide (entre 0.2 et 0.7 secondes)
            duration = random.uniform(0.2, 0.7)
            pyautogui.moveTo(new_x, new_y, duration=duration)
            last_set_position = (new_x, new_y)
            
            # Avec 20% de chances, effectuer un scroll vers le haut ou le bas
            if random.random() < 0.2:
                scroll_amount = random.choice([100, -100])
                pyautogui.scroll(scroll_amount)
            # Petite pause aléatoire avant le prochain mouvement
            time.sleep(random.uniform(0.2, 0.5))
        else:
            # En pause, mise à jour de la position de référence
            last_set_position = pyautogui.position()
            time.sleep(0.1)

def start_pause():
    """
    Alterne l'état de l'automatisation et met à jour le texte du bouton.
    """
    global running
    running = not running
    if running:
        start_pause_button.config(text="Pause")
    else:
        start_pause_button.config(text="Start")

# Création de la fenêtre principale avec Tkinter
root = tk.Tk()
root.title("Automatisation Souris Améliorée")

# Bouton Start/Pause
start_pause_button = tk.Button(root, text="Start", command=start_pause, width=20)
start_pause_button.pack(pady=10)

# Bouton Stop
stop_button = tk.Button(root, text="Stop", command=stop, width=20)
stop_button.pack(pady=10)

# Démarre le thread d'automatisation (daemon pour qu'il se ferme avec le programme)
thread = threading.Thread(target=automation, daemon=True)
thread.start()

# Boucle principale de l'interface Tkinter
root.mainloop()
