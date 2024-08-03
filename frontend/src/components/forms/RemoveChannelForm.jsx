import { Formik, Form } from 'formik';
import Button from 'react-bootstrap/Button';
import { useRemoveChannelMutation } from '#store/apiSlice';
import { mapStatusCodeToMessage } from '#utils';

const RemoveChannelForm = ({ channelId, onSuccess, onReset }) => {
  const [removeChannel] = useRemoveChannelMutation();

  const onSubmit = async (_, { setStatus }) => {
    try {
      const result = await removeChannel(channelId).unwrap();
      onSuccess(result);
    } catch (err) {
      const code = err.originalStatus || err.status;
      setStatus({ code });
    }
  };

  return (
    <Formik initialValues={{}} initialStatus={{}} onSubmit={onSubmit}>
      {({ isSubmitting, status }) => (
        <Form onReset={onReset}>
          {status.code && (
            <div className="small text-danger">
              <p className="m-0">{mapStatusCodeToMessage(status.code)}</p>
            </div>
          )}
          <div className="d-flex gap-2 justify-content-end mt-3">
            <Button type="reset" variant="secondary">Отменить</Button>
            <Button type="submit" variant="danger" disabled={isSubmitting}>Удалить</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RemoveChannelForm;
