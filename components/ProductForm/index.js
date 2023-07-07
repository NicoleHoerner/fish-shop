import { StyledForm, StyledHeading, StyledLabel } from "./ProductForm.styled";
import { StyledButton } from "../Button/Button.styled";

export default function ProductForm({ onSubmit, value, isEditMode }) {

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledHeading>{isEditMode ? "Edit the Fish" : "Add a new Fish"}</StyledHeading>
      <StyledLabel htmlFor="name">
        Name:
        <input type="text" id="name" name="name" defaultValue={value.name} />
      </StyledLabel>
      <StyledLabel htmlFor="description">
        Description:
        <input type="text" id="description" name="description" defaultValue={value.description}/>
      </StyledLabel>
      <StyledLabel htmlFor="price">
        Price:
        <input type="number" id="price" name="price" min="0" defaultValue={value.price}/>
      </StyledLabel>
      <StyledLabel htmlFor="currency">
        Currency:
        <select id="currency" name="currency">
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
      </StyledLabel>
      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
}
