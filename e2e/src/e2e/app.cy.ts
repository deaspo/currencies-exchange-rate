import { slowCypressDown } from 'cypress-slow-down';

slowCypressDown(300); // 100ms

describe('e2e', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('On first open, there is a searchbar,currency', () => {
		// Correct page url first load
		cy.url().should('eq', Cypress.config().baseUrl);
		// Find the components
		cy.get('[data-testid="search-input-field"]')
			.as('searchInputField')
			.should('be.visible');
		cy.get('[data-testid="search-results-list"]', { timeout: 30000 })
			.as('searchResultsList')
			.should('be.visible');
		cy.get('[data-testid="search-results-list-item"]')
			.as('searchResultsListItem')
			.should('be.visible');

		cy.get('@searchResultsListItem').should('have.length.greaterThan', 1);
	});
	it('The user searches and finds a single currency', () => {
		// Variables
		cy.get('[data-testid="search-input-field"]').as('searchInputField');
		cy.get('[data-testid="search-results-list-item"]').as(
			'searchResultsListItem'
		);
		// Perform search
		cy.get('@searchInputField').type('ken');
		// Check list
		cy.get('@searchResultsListItem').should('have.length', 1);
	});
	it('The user searches and finds multiple currencies', () => {
		// Variables
		cy.get('[data-testid="search-input-field"]').as('searchInputField');
		cy.get('[data-testid="search-results-list-item"]').as(
			'searchResultsListItem'
		);
		// Perform search
		cy.get('@searchInputField').type('dollar');
		// Check list
		cy.get('@searchResultsListItem').should('have.length.greaterThan', 1);
	});
	it('The user searches and does not finds a currency', () => {
		// Variables
		cy.get('[data-testid="search-input-field"]').as('searchInputField');
		cy.get('[data-testid="search-results-list-item"]').as(
			'searchResultsListItem'
		);
		// Perform search
		cy.get('@searchInputField').type('unknown');
		// Check list
		cy.get('@searchResultsListItem').should('have.length', 0);
	});
	it('The search term is present in the url', () => {
		cy.get('[data-testid="search-input-field"]').as('searchInputField');
		// Perform search
		cy.get('@searchInputField').type('dollar');
		// Check url has search term
		cy.url().should('eq', Cypress.config().baseUrl + '?currency=dollar');
	});
	it('Deep linking works with url', () => {
		cy.visit(Cypress.config().baseUrl + '?currency=ken');
		cy.get('[data-testid="search-input-field"]').as('searchInputField');
		// Perform search
		cy.get('@searchInputField').should('have.value', 'ken');
		// Check search results
		cy.get('[data-testid="search-results-list-item"]').should('have.length', 1);
	});
});
