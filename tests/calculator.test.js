import test from 'node:test'
import assert from 'node:assert/strict'
import Calculator from '../src/scripts/components/Calculator.js'

function enter(...buttons) {
    const originalDocument = globalThis.document
    const screen = { textContent: '' }
    globalThis.document = {
        querySelector: () => ({
            querySelector: () => screen,
            querySelectorAll: () => []
        })
    }

    let calculator
    try {
        calculator = new Calculator({
            root: '[data-js-calculator]',
            screen: '[data-js-calculator-screen]',
            button: '[data-js-calculator-button]'
        })
    } finally {
        if (originalDocument === undefined) {
            delete globalThis.document
        } else {
            globalThis.document = originalDocument
        }
    }

    for (const button of buttons) {
        calculator.buttonHandler({
            currentTarget: { getAttribute: () => button }
        })
    }

    return calculator
}

test('evaluates repeated operations from left to right', () => {
    assert.equal(enter('1', '+', '2', '+', '3', '=').screen.textContent, '6')
    assert.equal(enter('9', '-', '4', '-', '2', '=').screen.textContent, '3')
})

test('gives equal-precedence operations left-to-right associativity', () => {
    assert.equal(enter('8', '÷', '2', '×', '2', '=').screen.textContent, '8')
    assert.equal(enter('9', '%', '4', '×', '2', '=').screen.textContent, '2')
})

test('applies multiplication before addition and rounds only the final result', () => {
    assert.equal(enter('2', '+', '3', '×', '4', '=').screen.textContent, '14')
    assert.equal(enter('1', '÷', '3', '×', '3', '=').screen.textContent, '1')
    assert.equal(enter('0', '.', '1', '+', '0', '.', '2', '=').screen.textContent, '0.30')
})

test('supports negative operands and recovers after division by zero', () => {
    assert.equal(enter('-', '5', '+', '2', '=').screen.textContent, '-3')

    const calculator = enter('5', '÷', '0', '=')
    assert.equal(calculator.screen.textContent, 'Error')
    for (const button of ['7', '+', '1', '=']) {
        calculator.buttonHandler({ currentTarget: { getAttribute: () => button } })
    }
    assert.equal(calculator.screen.textContent, '8')
})
