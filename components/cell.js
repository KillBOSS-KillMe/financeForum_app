export default {
    name: 'tableRender',
    functional: true,
    props: {
        row: Object,
        render: Function,
        column: {
            type: Object,
            default: null
        },
		index:Number
    },
    render: (h, ctx) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index
        };
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
    }
};