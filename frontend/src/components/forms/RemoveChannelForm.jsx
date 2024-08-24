import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { useRemoveChannelMutation } from '#store/apiSlice';

const RemoveChannelForm = ({ channelId, onSuccess, onReset }) => {
  const [removeChannel] = useRemoveChannelMutation();
  const { t } = useTranslation();

  const onSubmit = async () => {
    try {
      const result = await removeChannel(channelId).unwrap();
      onSuccess(result);
    } catch (err) {
      const code = err.originalStatus || err.status;
      const message = t([`errors.${code}`, 'errors.default']);
      toast.error(message);
    }
  };

  return (
    <Formik initialValues={{}} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form onReset={onReset}>
          <div className="d-flex gap-2 justify-content-end mt-3">
            <Button type="reset" variant="secondary">
              {t('forms.removeChannel.reset')}
            </Button>
            <Button type="submit" variant="danger" disabled={isSubmitting}>
              {t('forms.removeChannel.submit')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RemoveChannelForm;
