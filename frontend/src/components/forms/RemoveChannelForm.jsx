import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import Button from 'react-bootstrap/Button';
import { useRemoveChannelMutation } from '#store/apiSlice';

const RemoveChannelForm = ({ channelId, onSuccess, onReset }) => {
  const [removeChannel] = useRemoveChannelMutation();
  const { t } = useTranslation();

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
              <p className="m-0">{t([`errors.${status.code}`, 'errors.default'])}</p>
            </div>
          )}
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
