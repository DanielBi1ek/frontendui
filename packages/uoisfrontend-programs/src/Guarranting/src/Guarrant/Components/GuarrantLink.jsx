import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const GuarrantURI = '/guarrant/guarrant/view/';

/**
 * A React component that renders a `ProxyLink` to an "guarrant" entity's view page.
 *
 * The target URL is dynamically constructed using the `guarrant` object's `id`, and the link displays
 * the `guarrant` object's `name` as its clickable content.
 *
 * @function GuarrantLink
 * @param {Object} props - The properties for the `GuarrantLink` component.
 * @param {Object} props.guarrant - The object representing the "guarrant" entity.
 * @param {string|number} props.guarrant.id - The unique identifier for the "guarrant" entity. Used to construct the target URL.
 * @param {string} props.guarrant.name - The display name for the "guarrant" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "guarrant" entity's view page.
 *
 * @example
 * // Example usage with a sample guarrant entity:
 * const guarrantEntity = { id: 123, name: "Example Guarrant Entity" };
 * 
 * <GuarrantLink guarrant={guarrantEntity} />
 * // Renders: <ProxyLink to="/guarrant/guarrant/view/123">Example Guarrant Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/guarrant/guarrant/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const GuarrantLink = ({guarrant}) => {
    return <ProxyLink to={GuarrantURI + guarrant.id}>{guarrant.name}</ProxyLink>
}