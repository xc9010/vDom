// 新老属性的对比
function updateProps(newVnode, oldProps = {}) {
    let domElement = newVnode.domElement // 新的真实DOM
    let newProps = newVnode.props // 当前节点中 的属性
    // 和老的做对比
    // 1，老的里面有，新的里面没有，这个属性直接干掉
    for(let oldPropsName in oldProps)
        if (!newProps[oldPropsName]) {
            delete domElement[oldPropsName]
        }
    // 2,老的里面没有 新的里面有
    for(let newPropsName in newProps) {
        domElement[newPropsName] = newProps[newPropsName]
    }

    // 3, style
    let newStyleObj = newProps.style || {}
    let oldStyleObj = oldProps.style || {}
    for(let propName in oldStyleObj) {
        if (!newStyleObj[propName]) {
            domElement.style[propName] = ''
        }
    }
    // 循环属性给DOM
    for(let newPropsName in newProps) {
        // 假如有style
        if(newPropsName === 'style') {
            let styleObj = newProps.style
            for(let s in styleObj) {
                domElement.style[s] = styleObj[s]
            }
        } else {
            domElement[newPropsName] = newProps[newPropsName]
        }
        // 假如没有
    }
}

function createDomElementVnode(vnode) {
    let {
        type,
        props,
        key,
        children,
        txt
    } = vnode;

    if (type) {
        vnode.domElement = document.createElement(type)
        // 根据我们虚拟节点的属性，再去更新真实DOM
        updateProps(vnode)
        // 递归调用渲染
        children.forEach(childNode => render(childNode, vnode.domElement));
    } else {
        vnode.domElement = document.createTextNode(txt)
    }
    return vnode.domElement
}

export function render(vnode, container) {
    let ele = createDomElementVnode(vnode)
    console.log(container)
    container.appendChild(ele)
}