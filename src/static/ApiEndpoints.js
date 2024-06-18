import { SERVER_URL } from "./Static";

const basePrefix = SERVER_URL + "/api/v1";

export const LoginUrl = basePrefix + "/login";

export const PrivacyPolicyURL = SERVER_URL + "/privacy-policy";
export const TermsOfServiceURL = SERVER_URL + "/terms-and-conditions";

export const GetTermsOrPrivacyHtmlUrl =
  basePrefix + "/get-terms-or-policy-html-text";
export const UploadTermsOrPrivacyHtmlUrl =
  basePrefix + "/upload-terms-or-policy-txt-file";
export const GetUsersDetailsByIdUrl = basePrefix + "/get-user-details-by-id";
export const GetUsersTransactionsUrl = basePrefix + "/get-users-transactions";
export const GetAllTradesbyPropertyUrl = basePrefix + "/get-all-property-trades";
export const GetAllUsersTradesUrl = basePrefix + "/get-all-users-trades";
export const GetUsersFiatTransactionsUrl =
  basePrefix + "/get-users-fiat-transactions";
export const UploadAdminProfilePicture = basePrefix + "/post-profile-picture";
export const UpdateAdminUserDetailsUrl =
  basePrefix + "/update-admin-user-details";
export const PostUserDetailsUrl = basePrefix + "/register";
export const GetUsersListUrl = basePrefix + "/get-users-list";
export const GetPropertyListUrl = basePrefix + "/get-property-list";
export const GetAllRegionsUrl = basePrefix + "/regions";
export const ChangeRegionStatusUrl = basePrefix + "/update-region-status";
export const AddRegionUrl = basePrefix + "/add-region";
export const GetRegionDetailsUrl = basePrefix + "/get-region-details-by-id";
export const UpdateRegionDetailsUrl = basePrefix + "/update-region";
export const UploadRegionIconUrl = basePrefix + "/upload-region-icon";
export const GetRegionListUrl = basePrefix + "/get-region-list";
export const AddResidentialPropertyUrl =
  basePrefix + "/add-residential-property";
export const UpdateResidentialPropertyUrl = basePrefix + "/update-residential-property";
export const UpdateCommercialPropertyUrl = basePrefix + "/update-commercial-property";
export const UpdateFarmPropertyUrl = basePrefix + "/update-farm-property";
export const AddCommercialPropertyUrl = basePrefix + "/add-commercial-property";
export const AddFarmPropertyUrl = basePrefix + "/add-farm-property";
export const UploadPropertyLogoUrl = basePrefix + "/add-project-logo";
export const GetPropertyImagesUrl = basePrefix + "/get-property-images";
export const AddPropertyImagesUrl = basePrefix + "/add-property-images";
export const AddSinglePropertyImageUrl =
  basePrefix + "/add-single-property-image";
export const DeletePropertyImageViaIndexUrl =
  basePrefix + "/delete-property-image-via-index";
export const GetPropertyCandlesUrl = basePrefix + "/get-candles-of-property";
export const SetPropertyCandlesUrl = basePrefix + "/set-candles-of-property";
export const GetPropertyDetailsUrl = basePrefix + "/get-property-details";
export const GetListofFeaturedPropertiesUrl = basePrefix + "/get-list-of-featured-properties-by-region";
export const GetListofRecommendedPropertiesUrl = basePrefix + "/get-list-of-recommended-properties-by-region";
export const GetListofTopRatedPropertiesUrl = basePrefix + "/get-list-of-top-properties-by-region";
export const GetListofPropertyToRecommendUrl = basePrefix + "/get-list-of-property-names-to-recommend";
export const SetFeaturedPropertiesUrl = basePrefix + "/set-featured-properties";
export const SetRecommendedPropertiesUrl = basePrefix + "/set-recommended-properties";
export const SetTopRatedPropertiesUrl = basePrefix + "/set-top-properties";
export const DeleteFeaturedPropertyUrl = basePrefix + "/delete-featured-properties";
export const DeleteRecommendedPropertyUrl = basePrefix + "/delete-recommended-properties";
export const DeleteTopRatedPropertyUrl = basePrefix + "/delete-top-properties";
export const GetAdsListUrl = basePrefix + "/get-ads-info";
export const GetWelcomeCardListUrl = basePrefix + "/get-welcome-card-info";
export const GetCTACardListUrl = basePrefix + "/get-cta-card-info";
export const AddAdsImageUrl = basePrefix + "/upload-ads-image";
export const AddWelcomeCardImageUrl = basePrefix + "/upload-welcome-card-image";
export const AddCTACardImageUrl = basePrefix + "/upload-cta-card-image";
export const AddAdsUrl = basePrefix + "/add-ads-card";
export const AddWelcomeCardUrl = basePrefix + "/add-welcome-card";
export const AddCTACardUrl = basePrefix + "/add-cta-card";
export const EditAdsUrl = basePrefix + "/update-ads-card";
export const EditWelcomeCardUrl = basePrefix + "/update-welcome-card";
export const EditCTACardUrl = basePrefix + "/upload-cta-card-image";
export const DeleteAdsUrl = basePrefix + "/delete-ads-card";
export const DeleteWelcomeCardUrl = basePrefix + "/delete-welcome-card";
export const DeleteCTACardUrl = basePrefix + "/delete-cta-card";
export const GetAllFiatTransactionsUrl = basePrefix + "/get-all-fiat-transactions";
export const GetAllCustomersRecentActivityUrl = basePrefix + "/get-customers-activity";
export const RequestForgotPasswordUrl = basePrefix + "/request-reset-password";
export const VerifyResetPasswordUrl = basePrefix + "/verify-reset-password-link";
export const GetOverviewDataUrl = basePrefix + "/get-dashboard-overview";
export const GetRevenueOverviewDataUrl = basePrefix + "/get-revenue-overview";
export const ExportUsersTransactionToExcelUrl = basePrefix + "/get-uses-transaction-via-email";
export const GetSalesChartDataUrl = basePrefix + "/get-sales-chart-data";
export const UploadPropertyDocuments = basePrefix + '/upload-property-documents'
export const GetPropertyDocuments = basePrefix + '/get-property-documents-by-id'