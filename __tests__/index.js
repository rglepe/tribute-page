import { jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { getByRole, getNodeText } from '@testing-library/dom';
const { pathname: root } = new URL('../index.html', import.meta.url)
const html = fs.readFileSync(path.resolve(root, '../index.html'), 'utf8');

jest.dontMock('fs');

test("1+1 should be 2", () => {
    expect(1 + 1).toBe(2);
});


describe('tribute page test', function () {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });
    afterEach(() => {
        // restore the original func after test
        jest.resetModules();
    });
    describe('test header section', () => {
        let header={}
        beforeEach(() => {
            header = document.querySelector('header');
        });
        test('should have a header section', () => {
            expect(header).toBeInTheDocument();
        });
        test('h1 exists', async function () {
            const h1 = getByRole(header, 'heading', { level: 1/* ,name: 'Tribute Page' */ });
            expect(h1).toBeInTheDocument();
        });
    });
    describe('test main section', () => {
        test('should have a main section', () => {
            const main = getByRole(document.body,'main');
            expect(main).toBeInTheDocument();
        });

        test('should have an image inside a figure', () => {
            const figure = getByRole(document.body,'figure');
            const figcaption = document.querySelector('figcaption');
            const img = getByRole(figure,'img');
            expect(figure).toBeInTheDocument();
            expect(figcaption).toBeInTheDocument();
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute('alt');

        });
    });
});


