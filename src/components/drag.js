const drag = () => {
    const testElement = document.createElement('div');
    testElement.setAttribute('id', 'test');
    testElement.setAttribute('draggable', 'true');
    testElement.style.width = '50px';
    testElement.style.height = '50px';
    testElement.style.border = 'solid 2px black';
    testElement.style.backgroundColor = 'purple';

    const destinationElement = document.createElement('div');
    destinationElement.setAttribute('id', 'test-dest');
    destinationElement.style.width = '100px';
    destinationElement.style.height = '100px';
    destinationElement.style.border = 'solid 2px black';
    destinationElement.style.backgroundColor = 'yellow';

    return {
        testElement,
        destinationElement,
    };
};

export default drag;
