import { ProgramsectionURI } from "../Components/ProgramsectionLink"
import { ProgramsectionPage } from "./ProgramsectionPage"

/**
 * A router segment definition for the Programsection page.
 *
 * This object defines a route path and its associated React element.
 * The `path` property is constructed using a base URI stored in `ProgramsectionURI`
 * and expects an `id` parameter. The `element` property specifies the React
 * component to render when the route matches.
 *
 * @constant {Object} ProgramsectionRouterSegment
 * @property {string} path - The URL path pattern for the route, e.g., "/programsection/programsection/view/:id".
 * @property {JSX.Element} element - The React element (component) to render, in this case, <ProgramsectionPage />.
 */
export const ProgramsectionRouterSegment = {
    path: `/${ProgramsectionURI}/:id`,
    element: <ProgramsectionPage />,
}