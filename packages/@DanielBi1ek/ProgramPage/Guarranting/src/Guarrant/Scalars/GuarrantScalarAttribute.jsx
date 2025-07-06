/**
 * A component for displaying the `scalar` attribute of an guarrant entity.
 *
 * This component checks if the `scalar` attribute exists on the `guarrant` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the GuarrantScalarAttribute component.
 * @param {Object} props.guarrant - The object representing the guarrant entity.
 * @param {*} [props.guarrant.scalar] - The scalar attribute of the guarrant entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const guarrantEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <GuarrantScalarAttribute guarrant={guarrantEntity} />
 */
export const GuarrantScalarAttribute = ({guarrant}) => {
    const {scalar} = guarrant
    if (typeof scalar === 'undefined') return null
    return (
        <>
            Probably {'<ScalarMediumCard scalar=\{scalar\} />'} <br />
            {JSON.stringify(scalar)}
        </>
    )
}