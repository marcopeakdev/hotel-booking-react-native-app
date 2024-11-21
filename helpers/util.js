export function stripeHTML(html) {
    const regex = /(<([^>]+)>)/ig;
    return html?.replace(regex, '') || '';
}
