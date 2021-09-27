import {
  Button,
  Grid,
  Grid as MuiGrid,
  IconButton,
  Paper as MuiPaper,
  TextField,
  Typography,
} from '@material-ui/core';
import { ArrowBackIos as ArrowBackIosIcon } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components/macro';
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { HandsonDetailWrite, HandsonContentWrite } from '../../../entity';
import { AppBase } from '../../../components/common/AppBase';
import { AppBar } from '../../../components/common/AppBar';
import { AppMain } from '../../../components/common/AppMain';
import { GrowContainer } from '../../../components/common/GrowContainer';
import { ErrorMessage } from '../../../components/common/ErrorMessage';
import { useHistory } from 'react-router';
import { format } from 'date-fns';

export type HandsonFormLayoutProps = {
  pageTitleText: string;
  submitButtonText: string;
  handson?: HandsonDetailWrite;
  contents?: HandsonContentWrite[];
  handleHandsonFormSubmit: (props: HandsonFormProps) => void;
};

export type HandsonFormProps = {
  title: string;
  headline: string;
  start_at: string;
  end_at: string;
  detail: string;
  document_url: string;
  meeting_url: string;
  movie_url: string;
  require: string;
  contents: HandsonContentWrite[];
};

const ContentGrid = styled(MuiGrid)`
  padding: ${(props) => props.theme.spacing(6)}px
    ${(props) => props.theme.spacing(20)}px;
`;

const FormPaper = styled(MuiPaper)`
  padding: ${(props) => props.theme.spacing(3)}px;
  flex-grow: 1;
`;

export const HandsonFormLayout = (
  props: HandsonFormLayoutProps
): JSX.Element => {
  const { handson, contents, handleHandsonFormSubmit } = props;
  const history = useHistory();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<HandsonFormProps>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contents',
  });

  const registerMui = (res: UseFormRegisterReturn) => ({
    inputRef: res.ref,
    onChange: res.onChange,
    onBlur: res.onBlur,
    name: res.name,
  });

  const onSubmit: SubmitHandler<HandsonFormProps> = (data) => {
    handleHandsonFormSubmit(data);
  };

  React.useEffect(() => {
    if (handson) {
      reset({
        ...handson,
        start_at: format(new Date(handson.start_at), "yyyy-MM-dd'T'HH:mm"),
        end_at: format(new Date(handson.end_at), "yyyy-MM-dd'T'HH:mm"),
        contents: contents || [],
      });
    }
  }, [handson, contents]);

  return (
    <AppBase>
      <AppBar
        left={
          <>
            <IconButton
              onClick={() =>
                handson
                  ? history.push('/handsons/' + handson.id)
                  : history.push('/handsons')
              }
            >
              <ArrowBackIosIcon />
            </IconButton>
          </>
        }
        right={<></>}
      ></AppBar>

      <AppMain>
        <ContentGrid>
          <Grid container spacing={2}>
            <Grid container item>
              <Typography variant="h5">{props.pageTitleText}</Typography>
            </Grid>
            <GrowContainer item flex={true}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>
                  <GrowContainer container item flex={true}>
                    <FormPaper>
                      <GrowContainer
                        container
                        direction="column"
                        spacing={3}
                        flex={true}
                      >
                        <Grid item>
                          <Typography variant="h6">タイトル</Typography>
                          <TextField
                            type="text"
                            fullWidth
                            variant="outlined"
                            {...registerMui(
                              register('title', { required: true })
                            )}
                          ></TextField>
                          {errors.title && (
                            <ErrorMessage message="タイトルは必須項目です"></ErrorMessage>
                          )}
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">見出し</Typography>
                          <TextField
                            type="text"
                            fullWidth
                            variant="outlined"
                            {...registerMui(register('headline'))}
                          ></TextField>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">開催日時</Typography>
                          <Grid container spacing={2}>
                            <Grid item>
                              <TextField
                                type="datetime-local"
                                {...registerMui(
                                  register('start_at', { required: true })
                                )}
                              ></TextField>
                              {errors.start_at && (
                                <ErrorMessage message="開始日時は必須項目です"></ErrorMessage>
                              )}
                            </Grid>
                            <Grid item>
                              <Typography variant="caption">~</Typography>
                            </Grid>
                            <Grid item>
                              <TextField
                                type="datetime-local"
                                {...registerMui(
                                  register('end_at', { required: true })
                                )}
                              ></TextField>
                              {errors.end_at && (
                                <ErrorMessage message="終了日時は必須項目です"></ErrorMessage>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">講義詳細</Typography>
                          <TextField
                            type="text"
                            fullWidth
                            variant="outlined"
                            multiline
                            {...registerMui(register('detail'))}
                          ></TextField>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">講義情報</Typography>
                          <Grid container direction="column" spacing={2}>
                            <Grid item>
                              <Typography variant="caption">
                                講義資料URL
                              </Typography>
                              <TextField
                                type="text"
                                fullWidth
                                variant="outlined"
                                size="small"
                                {...registerMui(register('document_url'))}
                              ></TextField>
                            </Grid>
                            <Grid item>
                              <Typography variant="caption">
                                会議先URL
                              </Typography>
                              <TextField
                                type="text"
                                fullWidth
                                variant="outlined"
                                size="small"
                                {...registerMui(register('meeting_url'))}
                              ></TextField>
                            </Grid>
                            <Grid item>
                              <Typography variant="caption">
                                講義動画URL
                              </Typography>
                              <TextField
                                type="text"
                                fullWidth
                                variant="outlined"
                                size="small"
                                {...registerMui(register('movie_url'))}
                              ></TextField>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">講義内容</Typography>
                          {fields.map((field, index) => (
                            <div key={index}>
                              <TextField
                                type="text"
                                fullWidth
                                variant="outlined"
                                multiline
                                defaultValue={field.content}
                                {...registerMui(
                                  register(`contents.${index}.content`)
                                )}
                              ></TextField>
                              <Button onClick={() => remove(index)}>
                                削除
                              </Button>
                            </div>
                          ))}
                          <Button onClick={() => append({})}>追加</Button>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">要件</Typography>
                          <TextField
                            type="text"
                            fullWidth
                            variant="outlined"
                            multiline
                            {...registerMui(register('require'))}
                          ></TextField>
                        </Grid>
                      </GrowContainer>
                    </FormPaper>
                  </GrowContainer>
                  <Grid container item justify="center">
                    <Button variant="contained" color="primary" type="submit">
                      {props.submitButtonText}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </GrowContainer>
          </Grid>
        </ContentGrid>
      </AppMain>
    </AppBase>
  );
};
