/**
 * WordPress dependencies
 */
import { dispatch, select, subscribe } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Entity registration function that includes duplicate detection
 *
 * @param {Array} entities Array of entity configurations to register
 * @return {Function} Unsubscribe function that can be called to cancel the subscription
 */
export function registerCustomEntities(entities) {
    if (!Array.isArray(entities) || entities.length === 0) {
        return () => {};
    }

    // Try immediate registration first
    tryRegisterEntities(entities);

    // Also set up a subscription to register when the core store becomes available
    // This is compatible with WordPress 5.8 and ensures entities are registered
    // as soon as the data store is ready
    const unsubscribe = subscribe(() => {
        // Check if core store is available and has the necessary methods
        if (select(coreStore) &&
            typeof select(coreStore).getEntitiesByKind === 'function') {

            // Register entities and then unsubscribe to avoid repeated registrations
            tryRegisterEntities(entities);
            unsubscribe();
        }
    });

    return unsubscribe;
}

/**
 * Helper function to try registering entities
 *
 * @param {Array} entities Array of entity configurations to register
 */
function tryRegisterEntities(entities) {
    try {
        // Entities to be registered after filtering out already registered ones
        const entitiesToRegister = [];

        // Process each entity configuration
        entities.forEach(entityConfig => {
            const { kind, name } = entityConfig;

            // Check if this specific entity is already registered
            let existingEntities = [];
            try {
                existingEntities = select(coreStore).getEntitiesByKind(kind) || [];
            } catch (e) {
                // If getEntitiesByKind fails, we'll assume no entities of this kind exist yet
            }

            const isAlreadyRegistered = existingEntities.some(entity => entity.name === name);

            // Only add to registration list if not already registered
            if (!isAlreadyRegistered) {
                entitiesToRegister.push(entityConfig);
            }
        });

        // Register all entities that need registration in a single call
        if (entitiesToRegister.length > 0) {
            dispatch(coreStore).addEntities(entitiesToRegister);
        }
    } catch (error) {
        console.warn('Failed to register custom entities:', error);
    }
}
