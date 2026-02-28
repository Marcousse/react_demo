/**
 * A toggle switch component.
 * 
 * @param {Object} props
 * @param {boolean} props.isToggled - Current state of the switch.
 * @param {Function} props.onToggle - Callback function for when switch is toggled.
 *
 * @returns {JSX.Element}
 */
export function ToggleSwitch({ isToggled, onToggle }) {
    return (
        <label class='toggle'>
            <input type='checkbox' checked={isToggled} onChange={onToggle} />
            <span class='slider' />
        </label>
    );
}