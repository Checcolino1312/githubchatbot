from typing import Any, Text, Dict, List
from pymongo import MongoClient
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rapidfuzz import process, fuzz  # aggiunto per matching fuzzy

class ActionControllaDisponibilita(Action):
    def name(self) -> Text:
        return "action_controlla_disponibilita"

    def run(self,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Connessione a MongoDB
        client = MongoClient("mongodb://mongo:27017/")
        db = client["biblioteca"]
        collezione = db["libri"]

        # Recupera il titolo del libro dallo slot
        titolo = tracker.get_slot("titolo_libro")

        if not titolo:
            dispatcher.utter_message(text="Non ho capito quale libro cerchi.")
            return []

        # Recupera tutti i titoli dal database
        titoli_db = [libro["titolo"] for libro in collezione.find({}, {"titolo": 1})]

        # Matching approssimativo tra il titolo estratto e i titoli del DB
        match, score, _ = process.extractOne(
            query=titolo,
            choices=titoli_db,
            scorer=fuzz.token_sort_ratio
        )
        
        if score >= 75:
            libro = collezione.find_one({"titolo": match})
            disponibile = libro.get("disponibile", False)

                # Recupero dati aggiuntivi
            autore = libro.get("autore", "autore sconosciuto")
            numero_inventario = libro.get("numero_inventario", "N/A")
            collocazione = libro.get("collocazione", "N/A")

            if disponibile:
                dispatcher.utter_message(text=(
                f"Il libro '{match}' di '{autore}' è disponibile.\n"
                f"\nNella biblioteca lo trovi con numero inventario: '{numero_inventario}'\n"
                f"\nCollocazione: '{collocazione}'")
            )
            else:
                dispatcher.utter_message(text=f"Il libro '{match}' non è disponibile.")
        else:
            dispatcher.utter_message(text=f"Non ho trovato nessun libro simile a '{titolo}'.")

        return []
