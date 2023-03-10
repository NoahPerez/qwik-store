import { ActiveCustomer, ShippingAddress } from '~/types';

export const addItemToOrderMutation = (productVariantId: string, quantity: number) => ({
	variables: {
		productVariantId,
		quantity,
	},
	query: `
	mutation addItemToOrder($productVariantId: ID!, $quantity: Int!) {
	 addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
			...OrderDetail
			... on ErrorResult {
				errorCode
				message
			}
		}
	}

	fragment OrderDetail on Order {
		__typename
		id
		code
		active
		createdAt
		state
		currencyCode
		totalQuantity
		subTotal
		subTotalWithTax
		taxSummary {
			description
			taxRate
			taxTotal
		}
		shippingWithTax
		totalWithTax
		customer {
			id
			firstName
			lastName
			emailAddress
		}
		shippingAddress {
			fullName
			streetLine1
			streetLine2
			company
			city
			province
			postalCode
			countryCode
			phoneNumber
		}
		shippingLines {
			shippingMethod {
				id
				name
			}
			priceWithTax
		}
		lines {
			id
			unitPriceWithTax
			linePriceWithTax
			quantity
			featuredAsset {
				id
				preview
			}
			productVariant {
				id
				name
				price
				product {
					id
					slug
				}
			}
		}
	}
`,
});

export const removeOrderLineMutation = (orderLineId: string) => ({
	variables: { orderLineId },
	query: `
	mutation removeOrderLine($orderLineId: ID!) {
		removeOrderLine(orderLineId: $orderLineId) {
			...OrderDetail
			... on ErrorResult {
				errorCode
				message
			}
		}
	}

	fragment OrderDetail on Order {
		__typename
		id
		code
		active
		createdAt
		state
		currencyCode
		totalQuantity
		subTotal
		subTotalWithTax
		taxSummary {
			description
			taxRate
			taxTotal
		}
		shippingWithTax
		totalWithTax
		customer {
			id
			firstName
			lastName
			emailAddress
		}
		shippingAddress {
			fullName
			streetLine1
			streetLine2
			company
			city
			province
			postalCode
			countryCode
			phoneNumber
		}
		shippingLines {
			shippingMethod {
				id
				name
			}
			priceWithTax
		}
		lines {
			id
			unitPriceWithTax
			linePriceWithTax
			quantity
			featuredAsset {
				id
				preview
			}
			productVariant {
				id
				name
				price
				product {
					id
					slug
				}
			}
		}
	}
`,
});

export const adjustOrderLineMutation = (orderLineId: string, quantity: number) => ({
	variables: { orderLineId, quantity },
	query: `
	mutation adjustOrderLine($orderLineId: ID!, $quantity: Int!) {
		adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
			...OrderDetail
			... on ErrorResult {
					errorCode
					message
			}
		}
	}
	
	fragment OrderDetail on Order {
		__typename
		id
		code
		active
		createdAt
		state
		currencyCode
		totalQuantity
		subTotal
		subTotalWithTax
		taxSummary {
			description
			taxRate
			taxTotal
		}
		shippingWithTax
		totalWithTax
		customer {
			id
			firstName
			lastName
			emailAddress
		}
		shippingAddress {
			fullName
			streetLine1
			streetLine2
			company
			city
			province
			postalCode
			countryCode
			phoneNumber
		}
		shippingLines {
			shippingMethod {
					id
					name
			}
			priceWithTax
		}
		lines {
			id
			unitPriceWithTax
			linePriceWithTax
			quantity
			featuredAsset {
					id
					preview
			}
			productVariant {
					id
					name
					price
					product {
							id
							slug
					}
			}
		}
	}
`,
});

export const loginMutation = (email: string, password: string, rememberMe: boolean) => ({
	variables: { email, password, rememberMe },
	query: `
	mutation login($email: String!, $password: String!, $rememberMe: Boolean) {
		login(username: $email, password: $password, rememberMe: $rememberMe) {
			__typename
			... on CurrentUser {
					id
					identifier
			}
			... on ErrorResult {
					errorCode
					message
			}
		}
	}
`,
});

export const logoutMutation = () => ({
	variables: {},
	query: `
	mutation logout {
		logout {
			success
		}
	}
`,
});

export const updateCustomerMutation = ({
	title,
	firstName,
	lastName,
	phoneNumber,
}: ActiveCustomer) => ({
	variables: { input: { title, firstName, lastName, phoneNumber } },
	query: `
	mutation updateCustomer($input: UpdateCustomerInput!) {
		updateCustomer(input: $input) {
			__typename
		}
	}
`,
});

export const requestUpdateCustomerEmailAddressMutation = (
	password: string,
	newEmailAddress: string
) => ({
	variables: { password, newEmailAddress },
	query: `
	mutation requestUpdateCustomerEmailAddress(
		$password: String!, $newEmailAddress: String!
	) {
		requestUpdateCustomerEmailAddress(
			password: $password
			newEmailAddress: $newEmailAddress
		) {
			__typename
			... on ErrorResult {
				errorCode
				message
		  	}
		}
	}  
`,
});

export const updateCustomerPasswordMutation = (currentPassword: string, newPassword: string) => ({
	variables: { currentPassword, newPassword },
	query: `
	mutation updateCustomerPassword($currentPassword: String! $newPassword: String!) {
        updateCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
            ... on Success {
                success
            }
            ...ErrorResult
        }
    }  
`,
});

export const updateCustomerAddressMutation = (input: ShippingAddress) => ({
	variables: { input },
	query: `
	mutation updateCustomerAddress($input: UpdateAddressInput!) {
		updateCustomerAddress(input: $input) {
			...Address
			... on ErrorResult {
				errorCode
				message
			}
		}
	}
`,
});

export const deleteCustomerAddressMutation = (id: string) => ({
	variables: { id },
	query: `
	mutation deleteCustomerAddress($id: ID!) {
		deleteCustomerAddress(id: $id) {
			success
			... on ErrorResult {
					errorCode
					message
			}
		}
	}
`,
});

export const setCustomerForOrderMutation = ({
	emailAddress,
	firstName,
	lastName,
}: Omit<ActiveCustomer, 'id'>) => ({
	variables: { input: { emailAddress, firstName, lastName } },
	query: `
	mutation setCustomerForOrder($input: CreateCustomerInput!) {
		setCustomerForOrder(input: $input) {
			...OrderDetail
			... on ErrorResult {
					errorCode
					message
			}
		}
	}

	fragment OrderDetail on Order {
		__typename
		id
		code
		active
		createdAt
		state
		currencyCode
		totalQuantity
		subTotal
		subTotalWithTax
		taxSummary {
			description
			taxRate
			taxTotal
		}
		shippingWithTax
		totalWithTax
		customer {
			id
			firstName
			lastName
			emailAddress
		}
		shippingAddress {
			fullName
			streetLine1
			streetLine2
			company
			city
			province
			postalCode
			countryCode
			phoneNumber
		}
		shippingLines {
			shippingMethod {
				id
				name
			}
			priceWithTax
		}
		lines {
			id
			unitPriceWithTax
			linePriceWithTax
			quantity
			featuredAsset {
				id
				preview
			}
			productVariant {
				id
				name
				price
				product {
					id
					slug
			}
			}
		}
	}
`,
});

export const setOrderShippingMethodMutation = (shippingMethodId: string) => ({
	variables: { shippingMethodId },
	query: `
	mutation setOrderShippingMethod($shippingMethodId: ID!) {
		setOrderShippingMethod(shippingMethodId: $shippingMethodId) {
			...OrderDetail
			... on ErrorResult {
					errorCode
					message
			}
		}
	}
		
	fragment OrderDetail on Order {
		__typename
		id
		code
		active
		createdAt
		state
		currencyCode
		totalQuantity
		subTotal
		subTotalWithTax
		taxSummary {
			description
			taxRate
			taxTotal
		}
		shippingWithTax
		totalWithTax
		customer {
			id
			firstName
			lastName
			emailAddress
		}
		shippingAddress {
			fullName
			streetLine1
			streetLine2
			company
			city
			province
			postalCode
			countryCode
			phoneNumber
		}
		shippingLines {
			shippingMethod {
					id
					name
			}
			priceWithTax
		}
		lines {
			id
			unitPriceWithTax
			linePriceWithTax
			quantity
			featuredAsset {
				id
				preview
			}
			productVariant {
				id
				name
				price
				product {
						id
						slug
				}
			}
		}
	}
`,
});

export const transitionOrderToStateMutation = (state = 'ArrangingPayment') => ({
	variables: { state },
	query: `
	mutation transitionOrderToState($state: String!) {
		transitionOrderToState(state: $state) {
				...OrderDetail
				... on ErrorResult {
						errorCode
						message
				}
		}
	}

	fragment OrderDetail on Order {
		__typename
		id
		code
		active
		createdAt
		state
		currencyCode
		totalQuantity
		subTotal
		subTotalWithTax
		taxSummary {
			description
			taxRate
			taxTotal
		}
		shippingWithTax
		totalWithTax
		customer {
			id
			firstName
			lastName
			emailAddress
		}
		shippingAddress {
			fullName
			streetLine1
			streetLine2
			company
			city
			province
			postalCode
			countryCode
			phoneNumber
		}
		shippingLines {
			shippingMethod {
				id
				name
			}
			priceWithTax
		}
		lines {
			id
			unitPriceWithTax
			linePriceWithTax
			quantity
			featuredAsset {
				id
				preview
			}
			productVariant {
				id
				name
				price
				product {
					id
					slug
				}
			}
		}
	} 
`,
});

export const addPaymentToOrderMutation = (
	input = { method: 'standard-payment', metadata: {} }
) => ({
	variables: { input },
	query: `
	mutation addPaymentToOrder($input: PaymentInput!) {
		addPaymentToOrder(input: $input) {
			...OrderDetail
			... on ErrorResult {
				errorCode
				message
			}
		}
	}
	
	fragment OrderDetail on Order {
		__typename
		id
		code
		active
		createdAt
		state
		currencyCode
		totalQuantity
		subTotal
		subTotalWithTax
		taxSummary {
			description
			taxRate
			taxTotal
		}
		shippingWithTax
		totalWithTax
		customer {
			id
			firstName
			lastName
			emailAddress
		}
		shippingAddress {
			fullName
			streetLine1
			streetLine2
			company
			city
			province
			postalCode
			countryCode
			phoneNumber
		}
		shippingLines {
			shippingMethod {
				id
				name
			}
			priceWithTax
		}
		lines {
			id
			unitPriceWithTax
			linePriceWithTax
			quantity
			featuredAsset {
				id
				preview
			}
			productVariant {
				id
				name
				price
				product {
					id
					slug
				}
			}
		}
	}
`,
});

export const setOrderShippingAddressMutation = (input: ShippingAddress) => ({
	variables: { input },
	query: `	
	mutation setOrderShippingAddress($input: CreateAddressInput!) {
		setOrderShippingAddress(input: $input) {
			...OrderDetail
			... on ErrorResult {
				errorCode
				message
			}
		}
	}

	fragment OrderDetail on Order {
		__typename
		id
		code
		active
		createdAt
		state
		currencyCode
		totalQuantity
		subTotal
		subTotalWithTax
		taxSummary {
			description
			taxRate
			taxTotal
		}
		shippingWithTax
		totalWithTax
		customer {
			id
			firstName
			lastName
			emailAddress
		}
		shippingAddress {
			fullName
			streetLine1
			streetLine2
			company
			city
			province
			postalCode
			countryCode
			phoneNumber
		}
		shippingLines {
			shippingMethod {
				id
				name
			}
			priceWithTax
		}
		lines {
			id
			unitPriceWithTax
			linePriceWithTax
			quantity
			featuredAsset {
				id
				preview
			}
			productVariant {
				id
				name
				price
				product {
					id
					slug
				}
			}
		}
		payments {
			id
			state
			method
			amount
			metadata
		}
	}
`,
});
