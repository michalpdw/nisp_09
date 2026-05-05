document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const mapContainer = document.getElementById('mapContainer');

    cards.forEach(card => {
        // Nasłuchujemy na kliknięcie w CAŁĄ kartę
        card.addEventListener('click', (e) => {
            const zone = card.getAttribute('data-zone');

            // Jeśli użytkownik kliknął w kartę, która jest już wybrana -> zresetuj
            if (card.classList.contains('selected')) {
                resetMap();
                return;
            }

            // Zaznacz nową strefę
            selectZone(card, zone);
        });
    });

    function selectZone(selectedCard, zone) {
        // Usuń zaznaczenia ze wszystkich
        cards.forEach(c => c.classList.remove('selected'));
        
        // Dodaj zaznaczenie do aktywnej karty
        selectedCard.classList.add('selected');

        // Aktywuj spotlight na mapie
        mapContainer.className = 'map-container active-zone';
        mapContainer.classList.add(`zone-${zone}`);

        // Płynne przewinięcie do mapy
        mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function resetMap() {
        cards.forEach(c => c.classList.remove('selected'));
        mapContainer.className = 'map-container';
    }

    // Kliknięcie w dowolne miejsce na mapie resetuje widok
    mapContainer.addEventListener('click', resetMap);
});