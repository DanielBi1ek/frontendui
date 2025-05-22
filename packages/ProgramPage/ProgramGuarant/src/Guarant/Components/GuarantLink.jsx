import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const GuarantURI = '/guarant/guarant/view/';

/**
 * A React component that renders a `ProxyLink` to an "guarant" entity's view page.
 *
 * The target URL is dynamically constructed using the `guarant` object's `id`, and the link displays
 * the `guarant` object's `name` as its clickable content.
 *
 * @function GuarantLink
 * @param {Object} props - The properties for the `GuarantLink` component.
 * @param {Object} props.guarant - The object representing the "guarant" entity.
 * @param {string|number} props.guarant.id - The unique identifier for the "guarant" entity. Used to construct the target URL.
 * @param {string} props.guarant.name - The display name for the "guarant" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "guarant" entity's view page.
 *
 * @example
 * // Example usage with a sample guarant entity:
 * const guarantEntity = { id: 123, name: "Example Guarant Entity" };
 * 
 * <GuarantLink guarant={guarantEntity} />
 * // Renders: <ProxyLink to="/guarant/guarant/view/123">Example Guarant Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/guarant/guarant/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const GuarantLink = ({guarant}) => {
    return <ProxyLink to={GuarantURI + guarant.id}>{guarant.name}</ProxyLink>
}