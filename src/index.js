console.log(123)

import {
    createElement,
    render
} from './vdom';

let vnode = createElement('div', {
    id: 'odiv',
    a: 1,
    key: 'xxx'
}, createElement('span', {
    style: { color: 'red' }
}, 'span'), 'td')
console.log(vnode)

render(vnode, app)