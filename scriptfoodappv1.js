document.addEventListener('DOMContentLoaded', function() {
    populateFoodItemsDropdown();
    setupFoodTrackingForm();
});

function populateFoodItemsDropdown() {
    const foodItems = ['Carrots', 'Apples', 'Quinoa', 'Garlic', 'Bananas', 'Spinach', 'Blueberries', 'Lentils', 'Almonds', 'Chia Seeds', 'Sweet Potatoes', 'Avocado', 'Brown Rice', 'Broccoli', 'Strawberries', 'Chickpeas', 'Walnuts', 'Flaxseeds', 'Beets', 'Oranges', 'Kale', 'Black Beans', 'Cashews', 'Pumpkin Seeds', 'Tomatoes', 'Pineapple', 'Oats', 'Cauliflower', 'Raspberries', 'Peanuts', 'Sunflower Seeds', 'Bell Peppers', 'Mango', 'Quinoa', 'Brussels Sprouts', 'Kiwi', 'Kidney Beans', 'Pecans', 'Sesame Seeds', 'Cucumber', 'Peach', 'Barley', 'Asparagus', 'Papaya', 'Soybeans', 'Hazelnuts', 'Hemp Seeds', 'Zucchini', 'Cherries', 'Millet', 'Eggplant', 'Grapefruit', 'Navy Beans', 'Macadamia Nuts', 'Poppy Seeds', 'Green Beans', 'Watermelon', 'Buckwheat', 'Artichokes', 'Pomegranate', 'Mung Beans', 'Pistachios', 'Cocoa Nibs', 'Butternut Squash', 'Plums', 'Farro', 'Leeks', 'Figs', 'Adzuki Beans', 'Brazil Nuts', 'Basil Seeds', 'Mushrooms', 'Grapes', 'Amaranth', 'Swiss Chard', 'Nectarines', 'Lima Beans', 'Coconut', 'Dill Seeds', 'Radishes', 'Pears', 'Teff', 'Onions', 'Apricots', 'Black-eyed Peas', 'Pine Nuts', 'Coriander Seeds', 'Pumpkin', 'Lychee', 'Spelt', 'Cabbage', 'Dates', 'Garbanzo Beans', 'Almond Butter', 'Mustard Seeds', 'Rutabaga', 'Dragon Fruit', 'Sorghum', 'Bok Choy', 'Persimmons'];
    const selectElement = document.getElementById('foodItemSelect');
    foodItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        selectElement.appendChild(option);
    });
}

function setupFoodTrackingForm() {
    const form = document.getElementById('foodTrackingForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const foodItem = formData.get('foodItem');
        const causesSymptoms = formData.get('symptomCheck') === 'on';
        const symptomDesc = formData.get('symptomDesc');
        const data = {
            foodItem,
            category: causesSymptoms ? 'red' : 'green',
            symptoms: symptomDesc,
            timestamp: new Date().toISOString()
        };
        saveDataToLocalStorage(data);
    });
}

function saveDataToLocalStorage(data) {
    const key = `foodData-${data.timestamp}`;
    localStorage.setItem(key, JSON.stringify(data));
}

function populateFoodLogList() {
    const listElement = document.getElementById('loggedFoods');
    listElement.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('foodData-')) {
            const item = JSON.parse(localStorage.getItem(key));
            const listItem = document.createElement('li');
            listItem.textContent = `Food Item: ${item.foodItem}, Causes Symptoms: ${item.category === 'red' ? 'Yes' : 'No'}, Symptoms: ${item.symptoms || 'N/A'}`;
            listElement.appendChild(listItem);
        }
    }
}

function toggleView() {
    const foodTrackingSection = document.getElementById('foodTracking');
    const foodLogListSection = document.getElementById('foodLogList');
    if (foodTrackingSection.style.display === 'none') {
        foodTrackingSection.style.display = 'block';
        foodLogListSection.style.display = 'none';
    } else {
        foodTrackingSection.style.display = 'none';
        foodLogListSection.style.display = 'block';
        populateFoodLogList();
    }
}
