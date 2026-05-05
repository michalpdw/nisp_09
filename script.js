document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const mapContainer = document.getElementById('mapContainer');
    const triggers = document.querySelectorAll('.map-trigger');

    console.log("Znaleziono stref klikalnych:", triggers.length);

    function resetMap() {
        cards.forEach(c => c.classList.remove('selected'));
        mapContainer.className = 'map-container';
    }

    function selectZone(zoneName) {
        console.log("Próba aktywacji strefy:", zoneName);
        const selectedCard = document.querySelector(`.card[data-zone="${zoneName}"]`);
        
        if (!selectedCard) return;

        if (selectedCard.classList.contains('selected')) {
            resetMap();
            return;
        }

        resetMap();
        selectedCard.classList.add('selected');
        mapContainer.classList.add('active-zone', `zone-${zoneName}`);
        
        // Przewijanie do karty
        selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Kliknięcia w mapę
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Ważne: zatrzymuje resetMap() z kontenera
            const zone = trigger.getAttribute('data-zone');
            selectZone(zone);
        });
    });

    // Kliknięcia w kafelki
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const zone = card.getAttribute('data-zone');
            selectZone(zone);
        });
    });

    // Kliknięcie w tło mapy (reset)
    mapContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('map-img') || e.target.id === 'mapContainer') {
            resetMap();
        }
    });
});