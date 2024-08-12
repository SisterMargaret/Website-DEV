document.addEventListener('DOMContentLoaded', function() {
    populateFoodItemsDropdown(foodItems); // Initially populate with all food items
    setupFoodTrackingForm();
    setupSearchFilter();
});

const foodItems = ['Almonds', 'Amaranth', 'Apples', 'Apricots', 'Artichokes', 'Asparagus', 'Avocado', 'Basil Seeds', 'Bananas', 'Barley', 'Beets', 'Bell Peppers', 'Black Beans', 'Black-eyed Peas', 'Blueberries', 'Bok Choy', 'Brazil Nuts', 'Broccoli', 'Brussels Sprouts', 'Buckwheat', 'Butternut Squash', 'Cabbage', 'Cashews', 'Cauliflower', 'Carrots', 'Cherries', 'Chia Seeds', 'Chickpeas', 'Cocoa Nibs', 'Coconut', 'Coriander Seeds', 'Cucumber', 'Dates', 'Dill Seeds', 'Dragon Fruit', 'Eggplant', 'Farro', 'Figs', 'Flaxseeds', 'Garbanzo Beans', 'Garlic', 'Grapes', 'Green Beans', 'Hazelnuts', 'Hemp Seeds', 'Kale', 'Kidney Beans', 'Kiwi', 'Leeks', 'Lentils', 'Lima Beans', 'Lychee', 'Macadamia Nuts', 'Mango', 'Millet', 'Mung Beans', 'Mushrooms', 'Mustard Seeds', 'Navy Beans', 'Nectarines', 'Oats', 'Oranges', 'Papaya', 'Peach', 'Peanuts', 'Pears', 'Pecans', 'Persimmons', 'Pine Nuts', 'Pineapple', 'Pistachios', 'Plums', 'Pomegranate', 'Poppy Seeds', 'Pumpkin', 'Pumpkin Seeds', 'Quinoa', 'Radishes', 'Raspberries', 'Red Beans', 'Rutabaga', 'Sesame Seeds', 'Sorghum', 'Soybeans', 'Spelt', 'Spinach', 'Strawberries', 'Sunflower Seeds', 'Sweet Potatoes', 'Swiss Chard', 'Teff', 'Tomatoes', 'Walnuts', 'Watermelon', 'Zucchini'];

function populateFoodItemsDropdown(foodItems) {
    const selectElement = document.getElementById('foodItemSelect');
    selectElement.innerHTML = ''; // Clear existing options first
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

function setupSearchFilter() {
    const foodItemSearch = document.getElementById('foodItemSearch');
    foodItemSearch.addEventListener('input', function() {
        const searchValue = foodItemSearch.value.toLowerCase();
        const filteredItems = foodItems.filter(item => item.toLowerCase().startsWith(searchValue));
        populateFoodItemsDropdown(filteredItems);
    });
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
