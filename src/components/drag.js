const dragStart = (e) => {
    e.dataTransfer.setData('text', e.target.id);
};

const dragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
};

export { dragStart, dragOver };
