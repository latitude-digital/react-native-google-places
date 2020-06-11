
import React from 'react'

import { NativeModules } from 'react-native'

const RNGooglePlacesNative = NativeModules.RNGooglePlaces

class RNGooglePlaces {
	static optionsDefaults = {
		type: '',
		country: '',
		useOverlay: false,
		initialQuery: '',
		useSessionToken: true,
		locationBias: {
			latitudeSW: 0,
			longitudeSW: 0,
			latitudeNE: 0,
			longitudeNE: 0
		},
		locationRestriction: {
			latitudeSW: 0,
			longitudeSW: 0,
			latitudeNE: 0,
			longitudeNE: 0
		}
	}

	static placeFieldsDefaults = []

	openAutocompleteModal(options = {}, placeFields = []) {
		return RNGooglePlacesNative.openAutocompleteModal({
			...RNGooglePlaces.optionsDefaults,
			...options
		}, [...RNGooglePlaces.placeFieldsDefaults, ...placeFields])
	}

	getAutocompletePredictions(query, options = {}) {
		return RNGooglePlacesNative.getAutocompletePredictions(query, {
            ...RNGooglePlaces.optionsDefaults,
			...options
		})
	}

	lookUpPlaceByID(placeID, placeFields = []) {
	    return RNGooglePlacesNative.lookUpPlaceByID(placeID, [...RNGooglePlaces.placeFieldsDefaults, ...placeFields])
	}

	getCurrentPlace(placeFields = []) {
		return RNGooglePlacesNative.getCurrentPlace([...RNGooglePlaces.placeFieldsDefaults, ...placeFields])
	}

	setSessionToken() {
		return RNGooglePlacesNative.setSessionToken()
	}

	// does some basic parsing of addressComponents into number/route/city/state/postal_code/country
	parseAddressComponents(addressComponents) {

		const ret = {
			street_number: null,
			route: null,
			city: null,
			state: null,
			postal_code: null,
			country: null,
		};

		for (const component of addressComponents) {
			// street_number
			if (component.types.includes('street_number')) {
				ret.street_number = component.name;
			}
			// route
			if (component.types.includes('route')) {
				ret.route = component.name;
			}
			// city
			if (component.types.includes('locality')) {
				ret.city = component.name;
			}
			// state
			if (component.types.includes('administrative_area_level_1')) {
				ret.state = component.shortName;
			}
			// postal_code
			if (component.types.includes('postal_code')) {
				ret.postal_code = component.name;
			}
			// country
			if (component.types.includes('country')) {
				ret.country = component.name;
			}
		}

		return ret;
	}
}

export default new RNGooglePlaces()
