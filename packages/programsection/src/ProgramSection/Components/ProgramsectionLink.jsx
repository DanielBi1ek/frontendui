import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const ProgramsectionURI = '/programsection/programsection/view/';

/**
 * A React component that renders a `ProxyLink` to an "programsection" entity's view page.
 *
 * The target URL is dynamically constructed using the `programsection` object's `id`, and the link displays
 * the `programsection` object's `name` as its clickable content.
 *
 * @function ProgramsectionLink
 * @param {Object} props - The properties for the `ProgramsectionLink` component.
 * @param {Object} props.programsection - The object representing the "programsection" entity.
 * @param {string|number} props.programsection.id - The unique identifier for the "programsection" entity. Used to construct the target URL.
 * @param {string} props.programsection.name - The display name for the "programsection" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "programsection" entity's view page.
 *
 * @example
 * // Example usage with a sample programsection entity:
 * const programsectionEntity = { id: 123, name: "Example Programsection Entity" };
 * 
 * <ProgramsectionLink programsection={programsectionEntity} />
 * // Renders: <ProxyLink to="/programsection/programsection/view/123">Example Programsection Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/programsection/programsection/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const ProgramsectionLink = ({programsection}) => {
    return <ProxyLink to={ProgramsectionURI + programsection.id}>{programsection.name}</ProxyLink>
}