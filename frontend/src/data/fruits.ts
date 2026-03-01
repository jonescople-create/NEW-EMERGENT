// fruits.ts

export interface Fruit {
    name: string;  
    color: string;  
    taste: string;  
    category: string;  
    nutritionalInfo: {  
        calories: number;  
        protein: number;  
        fat: number;  
        carbohydrates: number;  
        fiber: number;
    };
}

export const fruits: Fruit[] = [
    {
        name: 'Mango',
        color: 'Yellow',
        taste: 'Sweet',
        category: 'Tropical',
        nutritionalInfo: { calories: 60, protein: 0.8, fat: 0.4, carbohydrates: 15, fiber: 1.6 }
    },
    {
        name: 'Coconut',
        color: 'Brown',
        taste: 'Sweet',
        category: 'Tropical',
        nutritionalInfo: { calories: 354, protein: 3.3, fat: 33.5, carbohydrates: 15.2, fiber: 9 }  
    },
    {
        name: 'Ackee',
        color: 'Red/Yellow',
        taste: 'Savory',
        category: 'Tropical',
        nutritionalInfo: { calories: 151, protein: 4.2, fat: 8.3, carbohydrates: 19, fiber: 0.1 }
    },
    {
        name: 'Soursop',
        color: 'Green',
        taste: 'Sweet/Sour',
        category: 'Tropical',
        nutritionalInfo: { calories: 66, protein: 0.7, fat: 0.3, carbohydrates: 16.3, fiber: 3 }  
    },
    {
        name: 'Papaya',
        color: 'Orange',
        taste: 'Sweet',
        category: 'Tropical',
        nutritionalInfo: { calories: 59, protein: 0.5, fat: 0.4, carbohydrates: 15, fiber: 1.7 }
    },
    {
        name: 'Pineapple',
        color: 'Yellow',
        taste: 'Sweet/Tart',
        category: 'Tropical',
        nutritionalInfo: { calories: 50, protein: 0.5, fat: 0.1, carbohydrates: 13, fiber: 1.4 }
    },
    {
        name: 'Guava',
        color: 'Green/Pink',
        taste: 'Sweet',
        category: 'Tropical',
        nutritionalInfo: { calories: 68, protein: 2.6, fat: 0.9, carbohydrates: 14.3, fiber: 5.4 }
    },
    {
        name: 'Passion Fruit',
        color: 'Purple/Yellow',
        taste: 'Sweet/Tart',
        category: 'Tropical',
        nutritionalInfo: { calories: 97, protein: 2.2, fat: 0.4, carbohydrates: 24, fiber: 10.4 }
    },
    {
        name: 'Breadfruit',
        color: 'Green',
        taste: 'Savory',
        category: 'Tropical',
        nutritionalInfo: { calories: 102, protein: 1.1, fat: 0.4, carbohydrates: 27, fiber: 7.4 }
    },
    {
        name: 'Starfruit',
        color: 'Yellow',
        taste: 'Sweet/Sour',
        category: 'Tropical',
        nutritionalInfo: { calories: 31, protein: 1, fat: 0.3, carbohydrates: 7, fiber: 2.8 }
    }
];

export function searchFruits(query: string): Fruit[] {
    return fruits.filter(fruit => fruit.name.toLowerCase().includes(query.toLowerCase())  
        || fruit.category.toLowerCase().includes(query.toLowerCase()));
}

export function filterByCategory(category: string): Fruit[] {
    return fruits.filter(fruit => fruit.category.toLowerCase() === category.toLowerCase());
}