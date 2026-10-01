export default class Calculator {
    constructor(selectors) {
        this.selectors = selectors;
        const { root, screen, button } = selectors;
        this.rootElement = document.querySelector(root)
        this.screen = this.rootElement.querySelector(screen)
        this.buttons = this.rootElement.querySelectorAll(button)

        for (const button of this.buttons) {
            button.addEventListener("click", this.buttonHandler)
        }

        this.reset()
    }

    reset() {
        this.expressions = [{
            type: "number",
            value: "0"
        }]
        this.currentLine = '';
    }

    buttonHandler = (event) => {
        const data = event.currentTarget.getAttribute(this.selectors.button.slice(1, -1));
        if (this.currentLine === "Error") {
            this.reset()
        }
        const lastExpression = this.expressions.at(-1)

        if ("0123456789".includes(data) ||
            (data === '.' && !this.currentLine.includes('.') && this.currentLine.length !== 0) ||
            (data === '-' && (this.currentLine === '' || lastExpression.type === "operation"))
        ) {
            if (lastExpression.type !== "operation") {
                this.currentLine += data;
            } else {
                if (data !== '.') {
                    this.expressions.push({
                        type: "number",
                        value: this.currentLine
                    })
                    this.currentLine = data
                }
            }
        } else if (this.currentLine !== "" && this.currentLine.at(-1) !== '.' && this.currentLine.at(-1) !== '-') {
            if ("+-÷×%".includes(data)) {
                if (lastExpression.type === "operation") {
                    lastExpression.value = data;
                } else {
                    this.expressions.push({
                        type: "operation",
                        value: data
                    })
                    lastExpression.value = this.currentLine;
                }
            }

            if (data === "=") {
                if (lastExpression.type === "operation") {
                    this.expressions.pop()
                } else {
                    lastExpression.value = this.currentLine;
                }

                if (this.expressions.length > 2) {
                    this.currentLine = this.parseExpressions()
                }
            }
        }

        if (data.toLowerCase() === "ce") {
            this.reset()
        }

        if (data.toLowerCase() === "c") {
            if (lastExpression.type === "operation") {
                this.expressions.pop()
            } else {
                this.currentLine = this.currentLine.slice(0, -1)
            }
        }

        this.updateUI()
    }

    updateUI() {
        const lastExpression = this.expressions.at(-1)
        let printLine = this.currentLine

        if (lastExpression.type === "operation" && this.currentLine !== '') {
            printLine += lastExpression.value
        }

        this.screen.textContent = printLine
    }

    parseExpressions() {
        try {
            const operationGroups = [['×', '÷', '%'], ['+', '-']]

            for (const operations of operationGroups) {
                for (let i = 1; i < this.expressions.length - 1;) {
                    const element = this.expressions[i]
                    if (element.type === "operation" && operations.includes(element.value)) {
                        this.parseOperation(i, element.value)
                        i = Math.max(1, i - 2)
                    } else {
                        i += 2
                    }
                }
            }

            const result = Number(this.expressions[0].value)
            if (!Number.isFinite(result)) throw new Error("Invalid result")

            this.reset()
            return Number.isInteger(result) ? result.toFixed(0) : result.toFixed(2)
        } catch (error) {
            this.reset()
            return "Error"
        }
    }

    parseOperation(index, operation) {
        const leftOperand = this.parseNumber(this.expressions[index - 1].value)
        const rightOperand = this.parseNumber(this.expressions[index + 1].value)

        let result;
        switch (operation) {
            case "×":
                result = leftOperand * rightOperand
                break
            case "÷":
                result = leftOperand / rightOperand
                break
            case "%":
                result = leftOperand % rightOperand
                break
            case "+":
                result = leftOperand + rightOperand
                break
            case "-":
                result = leftOperand - rightOperand
                break
        }

        if (!Number.isFinite(result)) throw new Error("Invalid operation")

        this.expressions.splice(index, 2)
        this.expressions[index - 1].value = result
    }

    parseNumber(value) {
        return Number(value)
    }
}
