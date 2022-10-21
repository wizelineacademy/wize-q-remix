import PropTypes from 'prop-types';
import * as Styled from './SearchBarDropdown.Styled';
import { formatCollapsingText } from '~/utils/stringOperations';
import { markdownFormat } from '~/utils/markdownFormatQuestions';
import { COLLAPSED_QUESTION_MIN_LENGTH } from '~/utils/constants';

const SearchBarDropdown = ({ searchTerm, questions, onQuestionClick }) => {
  const renderNoResultMessage = () => {
    if (searchTerm) {
      return 'Oops! There are no results for your search';
    }

    return 'Find something...';
  };

  return (
    <Styled.Dropdown>
      {
        questions.length === 0 ?
        (<Styled.Alert>{renderNoResultMessage()}</Styled.Alert>)
        :
        (
          <div>
            <Styled.TitleContainer>Questions</Styled.TitleContainer>
            {
              questions.map(question => (
                <Styled.DropdownQuestion
                  key={question.question_id}
                  onClick={() => onQuestionClick(question.question_id)}
                >
                  <Styled.DepartmentLabel>
                    {
                      question.Department ?
                      question.Department.name :
                      'Not Assigned'
                    }
                  </Styled.DepartmentLabel>
                  {<Styled.QuestionMarkdown
                    children={formatCollapsingText(
                      markdownFormat(question.question),
                      question.question.length > COLLAPSED_QUESTION_MIN_LENGTH,
                      true,
                      COLLAPSED_QUESTION_MIN_LENGTH,
                    )}
                  />}
                </Styled.DropdownQuestion>
              ))
            }
          </div>
        )
      }
    </Styled.Dropdown>
  );
};

export default SearchBarDropdown;

// Props types
SearchBarDropdown.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  onQuestionClick: PropTypes.func.isRequired,
};

SearchBarDropdown.defaultProps = {
  searchTerm: '',
  questions: [],
};