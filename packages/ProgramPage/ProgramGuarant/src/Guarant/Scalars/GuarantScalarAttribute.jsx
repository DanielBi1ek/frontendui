/**
 * A component for displaying the `scalar` attribute of an guarant entity.
 *
 * This component checks if the `scalar` attribute exists on the `guarant` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the GuarantScalarAttribute component.
 * @param {Object} props.guarant - The object representing the guarant entity.
 * @param {*} [props.guarant.scalar] - The scalar attribute of the guarant entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const guarantEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <GuarantScalarAttribute guarant={guarantEntity} />
 */
export const GuarantScalarAttribute = ({guarant}) => {
    const {scalar} = guarant
    if (typeof scalar === 'undefined') return null
    return (
        <>
            Probably {'<ScalarMediumCard scalar=\{scalar\} />'} <br />
            {JSON.stringify(scalar)}
        </>
    )
}