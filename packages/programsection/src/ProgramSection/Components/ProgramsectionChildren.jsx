import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * ProgramsectionChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `programsection` entity along with other props to all child elements.
 * This component is useful for injecting a common `programsection` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the ProgramsectionChildren component.
 * @param {any} props.programsection - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `programsection` entity.
 *
 * @example
 * // Example usage:
 * const programsectionEntity = { id: 1, message: "No data available" };
 *
 * <ProgramsectionChildren programsection={programsectionEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </ProgramsectionChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'programsection' prop with the specified entity.
 */
export const ProgramsectionChildren = ({programsection, children, ...props}) => <ChildWrapper programsection={programsection} children={children} {...props} />