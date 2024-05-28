import { gql } from "@apollo/client";

export const GET_MY_CONSULTATIONS = gql`
  query GetMyConsultations {
    getMyConsultations {
      consultationDate
      consultationOfficer {
        name
      }
      healthCareProviders
      id
      medicalConditions
      consultationType
    }
  }
`;

export const DELETE_CONSULTATION = gql`
  mutation DeleteConsultation($consultationId: ID!) {
    deleteConsultation(consultationId: $consultationId)
  }
`;
