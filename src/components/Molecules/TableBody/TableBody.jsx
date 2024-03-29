import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import {
    computeUserAge,
    displayUserAddressCorrectly,
    getUserActions,
} from '../../../utils/helpers';
import ActionIconWrapper from '../ActionIconWrapper/ActionIconWrapper';
import { useStore } from '../../../store/useStore';

const TableBody = ({ users, ...rest }) => {
    const navigate = useNavigate();
    const goUserDetailsRoute = (id) => navigate(`/user-details/${id}`);
    const { table } = useStore();

    const days = table.mode === 'oneDay' ? 1 : 5;

    return (
        <tbody>
            {users.map((user, index) => {
                const userActions = getUserActions(user.calendar, days);

                return (
                    <tr
                        key={uuidv4()}
                        onClick={() => goUserDetailsRoute(user.uid)}
                        {...rest}
                        className='hover:cursor-pointer hover:bg-gray-100'
                    >
                        <th>{index + 1}</th>
                        <td>{`${user.name} ${user.lastname}`}</td>
                        <td>{displayUserAddressCorrectly(user.address)}</td>
                        <td>{user.address.phoneNumber}</td>
                        <td>{computeUserAge(user.dateOfBirth)}</td>
                        <td>
                            <div className='flex justify-between'>
                                <ActionIconWrapper data={userActions.moods} />
                            </div>
                        </td>
                        <td>
                            <div className='flex justify-between'>
                                <ActionIconWrapper data={userActions.contactRequests} />
                            </div>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
};

TableBody.propTypes = {
    users: PropTypes.array.isRequired,
};

export default TableBody;
