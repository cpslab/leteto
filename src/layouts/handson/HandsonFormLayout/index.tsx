import React from 'react';
import styled from 'styled-components/macro';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  HandsonDetailItem,
  HandsonContent,
} from '../../../services/service-types';
import {
  Button,
  Grid,
  Grid as MuiGrid,
  Paper as MuiPaper,
  TextField,
  Typography,
} from '@material-ui/core';
import { AppBase } from '../../../components/common/AppBase';
import { CustomAppBar } from '../../../components/common/CustomAppBar';
import { ErrorMessage } from '../../../components/common/ErrorMessage';

export type HandsonFormLayoutProps = {
  pageTitleText: string;
  submitButtonText: string;
  handson?: HandsonDetailItem;
  handsonContents?: HandsonContent[];
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
  contents: string[];
};

const ContentGrid = styled(MuiGrid)`
  padding: ${(props) => props.theme.spacing(6)}px
    ${(props) => props.theme.spacing(20)}px;
`;

const GrowGrid = styled(MuiGrid)`
  flex-grow: 1;
`;

const FormPaper = styled(MuiPaper)`
  padding: ${(props) => props.theme.spacing(3)}px;
  flex-grow: 1;
`;

export const HandsonFormLayout: React.FC<HandsonFormLayoutProps> = (props) => {
  const { handson, handleHandsonFormSubmit } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HandsonFormProps>();

  const onSubmit: SubmitHandler<HandsonFormProps> = (data) => {
    console.log(data);
    handleHandsonFormSubmit(data);
  };

  return (
    <Grid>
      <CustomAppBar
        left={
          <img
            src="/static/Leteto.svg"
            alt="Leteto"
            title="Leteto レテト"
            width="94px"
            height="100%"
          ></img>
        }
        right={
          <>
            <Button color="inherit">マイページ</Button>
          </>
        }
      ></CustomAppBar>

      <AppBase>
        <ContentGrid>
          <Grid container spacing={2}>
            <Grid container item>
              <Typography variant="h5">{props.pageTitleText}</Typography>
            </Grid>
            <GrowGrid item>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>
                  <GrowGrid container item>
                    <FormPaper>
                      <GrowGrid container direction="column" spacing={3}>
                        <Grid item>
                          <Typography variant="h6">タイトル</Typography>
                          <Controller
                            name="title"
                            control={control}
                            defaultValue={handson?.title || ''}
                            rules={{ required: true }}
                            render={({ field }) => {
                              return (
                                <TextField
                                  {...field}
                                  fullWidth
                                  variant="outlined"
                                ></TextField>
                              );
                            }}
                          ></Controller>
                          {errors.title && (
                            <ErrorMessage message="タイトルは必須項目です"></ErrorMessage>
                          )}
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">見出し</Typography>
                          <Controller
                            name="headline"
                            control={control}
                            defaultValue={handson?.headline || ''}
                            render={({ field }) => {
                              return (
                                <TextField
                                  {...field}
                                  fullWidth
                                  variant="outlined"
                                  multiline
                                ></TextField>
                              );
                            }}
                          ></Controller>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">開催日時</Typography>
                          <Grid container spacing={2}>
                            <Grid item>
                              <Controller
                                name="start_at"
                                control={control}
                                defaultValue={handson?.start_at || ''}
                                rules={{ required: true }}
                                render={({ field }) => {
                                  return (
                                    <TextField
                                      {...field}
                                      type="datetime-local"
                                    ></TextField>
                                  );
                                }}
                              ></Controller>
                              {errors.start_at && (
                                <ErrorMessage message="開始日時は必須項目です"></ErrorMessage>
                              )}
                            </Grid>
                            <Grid item>
                              <Typography variant="caption">~</Typography>
                            </Grid>
                            <Grid item>
                              <Controller
                                name="end_at"
                                control={control}
                                defaultValue={handson?.end_at || ''}
                                rules={{ required: true }}
                                render={({ field }) => {
                                  return (
                                    <TextField
                                      {...field}
                                      type="datetime-local"
                                    ></TextField>
                                  );
                                }}
                              ></Controller>
                              {errors.end_at && (
                                <ErrorMessage message="終了日時は必須項目です"></ErrorMessage>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">講義詳細</Typography>
                          <Controller
                            name="detail"
                            control={control}
                            defaultValue={handson?.detail || ''}
                            render={({ field }) => {
                              return (
                                <TextField
                                  {...field}
                                  fullWidth
                                  variant="outlined"
                                  multiline
                                ></TextField>
                              );
                            }}
                          ></Controller>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">講義情報</Typography>
                          <Grid container direction="column" spacing={2}>
                            <Grid item>
                              <Typography variant="caption">
                                講義資料URL
                              </Typography>
                              <Controller
                                name="document_url"
                                control={control}
                                defaultValue={handson?.document_url || ''}
                                render={({ field }) => {
                                  return (
                                    <TextField
                                      {...field}
                                      fullWidth
                                      variant="outlined"
                                      size="small"
                                    ></TextField>
                                  );
                                }}
                              ></Controller>
                            </Grid>
                            <Grid item>
                              <Typography variant="caption">
                                会議先URL
                              </Typography>
                              <Controller
                                name="meeting_url"
                                control={control}
                                defaultValue={handson?.meeting_url || ''}
                                render={({ field }) => {
                                  return (
                                    <TextField
                                      {...field}
                                      fullWidth
                                      variant="outlined"
                                      size="small"
                                    ></TextField>
                                  );
                                }}
                              ></Controller>
                            </Grid>
                            <Grid item>
                              <Typography variant="caption">
                                講義動画URL
                              </Typography>
                              <Controller
                                name="movie_url"
                                control={control}
                                defaultValue={handson?.movie_url || ''}
                                render={({ field }) => {
                                  return (
                                    <TextField
                                      {...field}
                                      fullWidth
                                      variant="outlined"
                                      size="small"
                                    ></TextField>
                                  );
                                }}
                              ></Controller>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">講義内容</Typography>
                          <Controller
                            name="contents"
                            control={control}
                            defaultValue=""
                            render={({ field }) => {
                              return (
                                <TextField
                                  {...field}
                                  fullWidth
                                  variant="outlined"
                                  multiline
                                ></TextField>
                              );
                            }}
                          ></Controller>
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">要件</Typography>
                          <Controller
                            name="require"
                            control={control}
                            defaultValue={handson?.require || ''}
                            render={({ field }) => {
                              return (
                                <TextField
                                  {...field}
                                  fullWidth
                                  variant="outlined"
                                  multiline
                                ></TextField>
                              );
                            }}
                          ></Controller>
                        </Grid>
                      </GrowGrid>
                    </FormPaper>
                  </GrowGrid>
                  <Grid container item justify="center">
                    <Button variant="contained" color="primary" type="submit">
                      {props.submitButtonText}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </GrowGrid>
          </Grid>
        </ContentGrid>
      </AppBase>
    </Grid>
  );
};
