
const selectCarPrice = ($, carPattern) => {
  switch (carPattern) {
    case 'toyota':
      return $('.mlp-welcome-msrp')
        .find('strong')
        .text()
        .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
    case 'nissan':
      return $('.primary-price')
        .find('strong')
        .first()
        .text()
        .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
    case 'honda':
      return $('.left-content.purchase-info')
        .find('h2')
        .text()
        .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
    case 'subaru':
      return $('.spec-element-one')
        .find('span.font-sizes-big')
        .text()
        .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
    case 'mazda':
      return $('.mde-home-trims__alternate--msrp')
        .find('p')
        .first()
        .children()
        .remove()
        .end()
        .text()
        .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
    case 'mazda1':
      return $('.mdp-flexiblecontent-trims-carousel__slide-blurb.mdp-foundation-copy')
        .find('p')
        .first()
        .children()
        .remove()
        .end()
        .text()
        .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
    case 'mazda2':
      return $('.mde-home-trims__trim--msrp')
        .find('p')
        .first()
        .children()
        .remove()
        .end()
        .text()
        .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
    case 'lexus':
      return $('div.msrp')
        .find('div.price')
        .first()
        .attr('data-msrp');
    case 'mitsubishi':
      return $('div.pricing')
        .find('p.item-value')
        .children()
        .remove()
        .end()
        .text()
        .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
    case 'acura':
      return $('span.price.acr-caption-3')
        .text()
        .replace(/[A-z]|[,$ *]|[\u25A0\u00A0\s]/g, '');
    default:
      return null;
  }
};

module.exports = selectCarPrice;
