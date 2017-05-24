using System;
using Microsoft.SPOT;
using System.Collections;

namespace EGDRAPTOR
{
    public class Padding
    {
        public int Top
        {
            get;
            set;
        }

        public int Right
        {
            get;
            set;
        }

        public int Bottom
        {
            get;
            set;
        }

        public int Left
        {
            get;
            set;
        }

        public Padding(int top, int right, int bottom, int left)
        {
            Top = top;
            Right = right;
            Bottom = bottom;
            Left = left;
        }

        public Padding()
            : this(0, 0, 0, 0)
        {
        }
    }

    class ConfigManager
    {
        const string DEFAULT_LINE_SPLITTER = "\r\n";
        const string DEFAULT_CONFIG_SPLITTER = "##";

        /// <summary>
        /// Defaults links list.
        /// @readonly
        /// </summary>
        public ArrayList PhoneNumbers
        {
            get;
            set;
        }

        const string DEFAULT_PHONE_NUMBERS_HEADING = "DEFAULT_PHONE_NUMBERS";

        public Padding Padding
        {
            get
            {
                return this.padding;
            }
        }

        const string EMPTY_TEMPLATE_PATH_HEADING = "EMPTY_TEMPLATE_PATH";

        private string emptyTemplatePath;

        public string EmptyTemplatePath
        {
            get
            {
                return this.emptyTemplatePath;
            }
        }

        const string CONTAINER_ID_HEADING = "CONTAINER_ID";

        private string containerId;

        public string ContainerId
        {
            get
            {
                return this.containerId;
            }
        }

        const string CONTAINER_ADDRESS_HEADING = "CONTAINER_ADDRESS";

        private string containerAddress;

        public string ContainerAddress
        {
            get
            {
                return this.containerAddress;
            }
        }

        const string DEFAULT_PADDING_HEADING = "DEFAULT_PADDING";

        private Padding padding = new Padding();

        enum ParsingStatus
        {
            NONE = 0,
            DEFAULT_PHONE_NUMBER = 8,
            DEFAULT_PADDING = 16,
            EMPTY_TEMPLATE_PATH = 32,
            CONTAINER_ID = 64,
            CONTAINER_ADDRESS = 128
        }

        public ConfigManager(string configText)
        {
            PhoneNumbers = new ArrayList();
            ParsingStatus status = ParsingStatus.NONE;
            int newLinePosition = configText.IndexOf(DEFAULT_LINE_SPLITTER);

            while (newLinePosition > 0)
            {
                string line = configText.Substring(0, newLinePosition);

                if (status == ParsingStatus.NONE)
                {
                    status = isLineHeading(line);
                }

                status = this.handleStatus(status, line);

                configText = configText.Substring(newLinePosition + DEFAULT_LINE_SPLITTER.Length);
                newLinePosition = configText.IndexOf(DEFAULT_LINE_SPLITTER);
            }
        }

        private ParsingStatus isLineHeading(string line)
        {
            switch (line)
            {
                case DEFAULT_PHONE_NUMBERS_HEADING:
                    {
                        return ParsingStatus.DEFAULT_PHONE_NUMBER;
                    }
                case DEFAULT_PADDING_HEADING:
                    {
                        return ParsingStatus.DEFAULT_PADDING;
                    }
                case EMPTY_TEMPLATE_PATH_HEADING:
                    {
                        return ParsingStatus.EMPTY_TEMPLATE_PATH;
                    }
                case CONTAINER_ID_HEADING:
                    {
                        return ParsingStatus.CONTAINER_ID;
                    }
                case CONTAINER_ADDRESS_HEADING:
                    {
                        return ParsingStatus.CONTAINER_ADDRESS;
                    }
                case DEFAULT_CONFIG_SPLITTER:
                default:
                    {
                        return ParsingStatus.NONE;
                    }
            }
        }

        private ParsingStatus handleStatus(ParsingStatus status, string line)
        {
            // Checking for end of config section
            if (line == DEFAULT_CONFIG_SPLITTER)
            {
                return ParsingStatus.NONE;
            }

            // Ignoring commented lines
            if (line.IndexOf(DEFAULT_CONFIG_SPLITTER) == 0)
            {
                return status;
            }

            switch (status)
            {
                case ParsingStatus.NONE: break;
                #region Default phone number
                case ParsingStatus.DEFAULT_PHONE_NUMBER:
                    {
                        if (line != DEFAULT_PHONE_NUMBERS_HEADING)
                        {
                            this.PhoneNumbers.Add(line);
                        }
                    } break;
                #endregion
                #region Default padding
                case ParsingStatus.DEFAULT_PADDING:
                    {
                        if (line != DEFAULT_PADDING_HEADING)
                        {
                            int equalSign = line.IndexOf("=");

                            string varName = line.Substring(0, equalSign);
                            string valueString = line.Substring(equalSign + 1);

                            try
                            {
                                int value = int.Parse(valueString);
                                switch (varName)
                                {
                                    case "TOP":
                                        {
                                            this.padding.Top = value;
                                        } break;
                                    case "RIGHT":
                                        {
                                            this.padding.Right = value;
                                        } break;
                                    case "BOTTOM":
                                        {
                                            this.padding.Bottom = value;
                                        } break;
                                    case "LEFT":
                                        {
                                            this.padding.Left = value;
                                        } break;
                                }
                            }
                            catch (Exception exeption)
                            {
                                Debug.Print("Failed to parse config padding value." + exeption.Message);
                            }
                        }
                    } break;
                #endregion
                #region Empty template path
                case ParsingStatus.EMPTY_TEMPLATE_PATH:
                    {
                        if (line != EMPTY_TEMPLATE_PATH_HEADING)
                        {
                            this.emptyTemplatePath = line;
                        }
                    } break;
                #endregion
                #region Container Id
                case ParsingStatus.CONTAINER_ID:
                    {
                        if (line != CONTAINER_ID_HEADING)
                        {
                            this.containerId = line;
                        }
                    } break;
                #endregion
                #region Container Address
                case ParsingStatus.CONTAINER_ADDRESS:
                    {
                        if (line != CONTAINER_ADDRESS_HEADING)
                        {
                            this.containerAddress = line;
                        }
                    } break;
                #endregion
            }

            return status;
        }
    }
}
