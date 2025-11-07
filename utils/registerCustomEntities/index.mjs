/**
 * WordPress dependencies
 */
import { dispatch, select, subscribe } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Entity registration function that includes duplicate detection
 * and delayed registration until the core store is available.
 *
 * Adds custom entities to the core data store if they are not already registered.
 *
 * An entity configuration should include:
 * - kind: The kind of the entity (e.g., 'postType', 'taxonomy', or custom kinds)
 * - name: The name of the entity (e.g., 'import-bob', 'import-bob-custom')
 *
 * @example
 * registerCustomEntities( [
 *     { kind: 'postType', name: 'import-bob' },
 *     { kind: 'postType', name: 'import-bob-custom' },
 * ] );
 *
 * @param {Array} entities Array of entity configurations to register
 * @return {Function} Unsubscribe function that can be called to cancel the subscription
 */
export function registerCustomEntities( entities ) {
	if ( ! Array.isArray( entities ) || entities.length === 0 ) {
		return () => {};
	}

	let registrationComplete = false;

	// Helper to check if core store is ready
	const isCoreStoreReady = () => {
		const coreSelect = select( coreStore );
		const coreDispatch = dispatch( coreStore );
		return (
			coreSelect &&
			coreDispatch &&
			typeof coreSelect.getEntitiesByKind === 'function' &&
			typeof coreDispatch.addEntities === 'function'
		);
	};

	// Try immediate registration if core store is ready
	if ( isCoreStoreReady() ) {
		registrationComplete = tryRegisterEntities( entities );
		if ( registrationComplete ) {
			return () => {};
		}
	}

	// Set up subscription to register when core store becomes available
	const unsubscribe = subscribe( () => {
		// Skip if already registered or core store not ready
		if ( registrationComplete || ! isCoreStoreReady() ) {
			return;
		}

		// Try to register entities
		registrationComplete = tryRegisterEntities( entities );

		// Clean up subscription once registration is complete
		if ( registrationComplete ) {
			unsubscribe();
		}
	} );

	return unsubscribe;
}

/**
 * Helper function to try registering entities
 *
 * @param {Array} entities Array of entity configurations to register
 * @return {boolean} Whether registration was successful
 */
function tryRegisterEntities( entities ) {
	try {
		const entitiesToRegister = [];

		// Process each entity configuration
		entities.forEach( ( entityConfig ) => {
			const { kind, name } = entityConfig;

			// Check if this specific entity is already registered
			const existingEntities =
				select( coreStore ).getEntitiesByKind( kind ) || [];

			const isAlreadyRegistered = existingEntities.some(
				( entity ) => entity.name === name
			);

			// Only add to registration list if not already registered
			if ( ! isAlreadyRegistered ) {
				entitiesToRegister.push( entityConfig );
			}
		} );

		// Register all entities that need registration in a single call
		if ( entitiesToRegister.length > 0 ) {
			dispatch( coreStore ).addEntities( entitiesToRegister );
		}

		return true;
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.warn( 'Failed to register custom entities:', error );
		return false;
	}
}
