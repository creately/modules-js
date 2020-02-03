/**
 * Hello World text template
 */
const template = 'hello $!';

/**
 * Returns a string which says hello to given name.
 * @param name the person to say hello to
 */
export function hello(name = 'world'): string {
    return template.replace('$', name);
}
